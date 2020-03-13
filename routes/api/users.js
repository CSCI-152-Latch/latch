const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')
const { check, validationResult } = require("express-validator"); // better understanding on npm documentation
const User = require("../../models/User"); //importing teh user model
const Friend = require('../../models/Friend');
const auth = require('../../middleware/auth');
//express-validator helps making sure that the fileds are filled correctly

// Type:        POST
// Where:       api/user
// Purpose:     Registerig a new user
// Acess:       Public
router.post(
  "/",
  [
    check("firstName", "Name is required")
      .not()
      .isEmpty(),
    check("lastName", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Make sure email is valid").isEmail(),
    check("nickName", "Username is required")
      .not()
      .isEmpty(),
    check("password", "Enter password minimum 6 characters").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    //console.log(req.body); //when we want to check response in terminal
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //bad request
    } //for simplicity sake, we will deconstruct the req.body for the payload information
    const { firstName, lastName, email, nickName, password } = req.body;

    //making a new query using findone()
    try {
      //here are going to run a few checks to make to register the user
      //see if the user exists cause only unique emails**
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: "User exists" }] });
      }

      //see if the user's nickname exists cause unique nicknames
      let userName = await User.findOne({ nickName });
      if (userName) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Username already taken" }] });
      }

      //get the gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "retro"
      });
      //this doesnt actually save the user it just creates an instance of the user
      user = new User({
        firstName,
        lastName,
        email,
        nickName,
        avatar,
        password
      });

      //encrypt the password with bycrypt js
      const salt = await bcrypt.genSalt(10); //the salt is what will be hashing

      user.password = await bcrypt.hash(password, salt); //hash the password
      await user.save(); //this actually savees the user.

      //return the jsonwebtocken for traversing the site.
      //JWT's return a payload and what we will be using is the User's Id as the payload so that they can
      //traverse through protected routes.
      const payload = {
        user: {
          id: user.id
        }
    }
    jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
        if (err) throw err;
            res.json({ token });
        }
    );
    //res.send("User registered");
    } 
        catch (err) {
            //if something goes wrong here then its a server error
            console.error(err.message);
            res.status(500).send("server error status 500");
        }
    }
);

// Type:        POST
// Where:       api/user
// Purpose:     Creating a new friends list for a new user
// Acess:       Private
router.post(
    '/friend', 
    auth,
    async (req, res) => {
        try {
            const { user, friends, requesting, spending } = req.body;   // Un packing the request object
  
            const friend = new Friend({
                _id: new mongoose.Types.ObjectId(user),
                friends,
                requesting,
                spending
            });

            await friend.save();
            return res.send(friend);
        }
        catch (err) {
            res.status(500).send(err);
            res.send('sdfsfdsdffds')   
        }
    }
);

// Type:        POST
// Where:       api/user
// Purpose:     Adding new friends
// Acess:       Private
router.post('/add', auth, async (req, res) => {
    try {
        const { newRequester, newSpender } = req.body;
        const requesterID = mongoose.Types.ObjectId(newRequester);
        const spenderID   = mongoose.Types.ObjectId(newSpender);

        const isRequest = await Friend.findOne({ _id: requesterID, requesting: newSpender });
        if (isRequest) {
           return res.send('Already requested!');
        }
        
        const requester = await Friend.findById(requesterID);
        const spender = await Friend.findById(spenderID);

        requester.requesting.push(newSpender);
        spender.spending.push(newRequester);
        await requester.save();
        await spender.save();

        res.send({requester, spender});
    }
    catch (err) {
        res.status(500).send(err);
    }
});

// Type:        POST
// Where:       api/user
// Purpose:     Cancel friend request
// Acess:       Private
router.post('/cancel', auth, async (req, res) => {
    try {
        const { currRequester, currSpender } = req.body;
        const requesterID = mongoose.Types.ObjectId(currRequester);
        const spenderID   = mongoose.Types.ObjectId(currSpender);

        const requester = await Friend.findOne({ _id: requesterID, requesting: currSpender });
        const spender   = await Friend.findOne({ _id: spenderID, spending: currRequester });
        if (!requester && !spender) {
            return res.send('Users are not friends!');
        }

        requester.requesting.pull(currSpender);
        spender.spending.pull(currRequester);
        await requester.save();
        await spender.save();

        res.send({ requester, spender });
    }
    catch (err) {
        res.status(500).send(err);
    }
});

// Type:        POST
// Where:       api/user
// Purpose:     Delete a friend
// Acess:       Private
router.post('/delete', auth, async (req, res) => {
    try {
        const { currRequester, currSpender } = req.body;
        const requesterID = mongoose.Types.ObjectId(currRequester);
        const spenderID   = mongoose.Types.ObjectId(currSpender);

        const requester = await Friend.findOne({ _id: requesterID, friends: currSpender });
        const spender   = await Friend.find({ _id: spenderID, friends: currRequester });

        if (!requester || !spender) {
            res.send('Someone is hacking');
        }

        requester.friends.pull(currSpender);
        spender.friends.pull(currRequester);
        await requester.save();
        await spender.save();
        
        res.send({ requester, spender })
    }
    catch (err) {
        res.status(500).send(err)
    }
});

// Type:        POST
// Where:       api/user
// Purpose:     Accepting a friend
// Acess:       Private
router.post('/accept', auth, async (req, res) => {
    try {
        const { currRequester, currSpender } = req.body;
        const requesterID = mongoose.Types.ObjectId(currRequester);
        const spenderID   = mongoose.Types.ObjectId(currSpender);

        const requester = await Friend.findOne({ _id: requesterID, requesting: currSpender });
        const spender   = await Friend.findOne({ _id: spenderID, spending: currRequester });

        if (!requester || !spender) {
            res.status(500).send('Someone is hacking');
        }

        requester.requesting.pull(currSpender);
        spender.spending.pull(currRequester);
        requester.friends.push(currSpender);
        spender.friends.push(currRequester);

        await requester.save();
        await spender.save();
    }
    catch (err) {
        res.status(500).send(err);
    }
})

// Type:        GET
// Where:       api/user
// Purpose:     Finding a specific friend (in friend, requesting, spending)
// Acess:       Private
router.get(
    '/view', 
    // auth,
    async (req, res) => {
        try {
            const { searchUser } = req.body
            const currentUser = await Friend.findOne({ user: searchUser })

            if (!currentUser) {
                return res.send('User not found');
            }

            res.send(currentUser.requesting);
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
);

module.exports = router;
