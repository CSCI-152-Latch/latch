const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')
const { check, validationResult, body } = require("express-validator"); // better understanding on npm documentation
const User = require("../../models/User"); //importing teh user model
const Friend = require('../../models/Friend');
const auth = require('../../middleware/auth');
//express-validator helps making sure that the fileds are filled correctly

// Type:         POST
// Where:        api/
// Purpose:      Registering
// Access:       Public
router.post(
    '/',
    [
        check('firstName')
            .notEmpty().withMessage('First name is require')
            .isAlpha().withMessage('First name must be alphabet'),

        check('lastName')
            .notEmpty().withMessage('Last name is require')
            .isAlpha().withMessage('Last name must be alphabet'),

        check('email')
            .notEmpty().withMessage('Email is require')
            .isEmail().withMessage('Email must be in correct format'),

        check('nickName')
            .notEmpty().withMessage('Nickname is require'),

        check('password')
            .isLength({ min: 6 }).withMessage('Enter password minimum 6 characters'),
    
        body('nickName')
            .trim()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); //bad request
        } 
        //for simplicity sake, we will deconstruct the req.body for the payload information
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
        } 
        catch (err) {
            //if something goes wrong here then its a server error
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
            const { user, friends, requesting, spending } = req.body;  
            
            await Friend.create(
                {
                    _id: user,
                    friends,
                    requesting,
                    spending
                },
                (error, result) => {
                   if (error) {
                       return res.status(500).send(error);
                   }
                   return res.send(result);
                }
            );
        }
        catch (err) {
            res.status(500).send(err);  
        }
    }
);

// Type:        POST
// Where:       api/user
// Purpose:     Adding new friends
// Acess:       Private
router.post(
    '/add', 
    auth, 
    async (req, res) => {
        try {
            const { newRequester, newSpender } = req.body;

            // Check if both user in request and spending list
            const isRequested = await Friend.exists(
                {
                    _id: newRequester,
                    requesting: newSpender
                }
            ); 
            if (isRequested) {
                return res.send('You have already requested this user!');
            }

            // Check if both user are friend
            const isFriend = await Friend.exists(
                { 
                    _id: newRequester, 
                    friends: newSpender 
                }
            );
            if (isFriend) {
                return res.send('This user is your friend already');
            }

            // Request to be friend
            const requester = await Friend.findOneAndUpdate(
                { _id: newRequester },
                {
                    $addToSet: { requesting: newSpender }
                },
                { new: true },
                (error, _) => {
                    if (error) {
                        return res.send('Requester user doesn\'t exist');
                    }
                }            
            );

            const spender = await Friend.findOneAndUpdate(
                { _id: newSpender }, 
                {
                    $addToSet: { spending: newRequester } 
                },
                { new: true },
                (error, _) => {
                    if (error) {
                        return res.send('Spender user doesn\'t exist');
                    }
                }
            );
            
            res.send({ requester, spender });
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
);

// Type:        POST
// Where:       api/user
// Purpose:     Cancel friend request
// Acess:       Private
router.post(
    '/cancel', 
    auth, 
    async (req, res) => {
        try {
            const { currRequester, currSpender } = req.body;

            // Check if both user are in request and spending
            const isRequest = await Friend.exists(
                {
                    _id: currRequester,
                    requesting: currSpender
                }
            ); 
            if (!isRequest) {
                return res.send('You dont know this user!');
            }

            // Cancel the request and spending
            const requester = await Friend.findOneAndUpdate(
                { _id: currRequester },
                {
                    $pull: { requesting: currSpender }
                },
                { new: true },
                (error, _) => {
                    if (error) {
                        res.status(500).send('Reqeuster doesn\'t have the spender');
                    }
                }
            );

            const spender = await Friend.findOneAndUpdate(
                { _id: currSpender },
                {
                    $pull: { spending: currRequester }
                },
                { new: true },
                (error, _) => {
                    if (error) {
                        res.status(500).send('Spender doesn\'t have the requester');
                    }
                }
            );

            res.send({ requester, spender });
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
);

// Type:        POST
// Where:       api/user
// Purpose:     Delete a friend
// Acess:       Private
router.post(
    '/delete', 
    auth, 
    async (req, res) => {
        try {
            const { currRequester, currSpender } = req.body;

            // This check if both user are friend
            const isFriend = await Friend.exists(
                { 
                    _id: currRequester, 
                    friends: currSpender 
                }
            );
            if (!isFriend) {
                return res.send('You don\'t have this user as a friend!');
            }

            // Delete each other from thier friend list
            const requester = await Friend.findOneAndUpdate(
                { _id: currRequester },
                {
                    $pull: { friends: currSpender }
                },
                { new: true }
            );
            
            const spender = await Friend.findOneAndUpdate(
                { _id: currSpender },
                {
                    $pull: { friends: currRequester }
                },
                { new: true }  
            );
            
            res.send({ requester, spender })
        }
        catch (err) {
            res.status(500).send(err)
        }
    }
);

// Type:        POST
// Where:       api/user
// Purpose:     Accepting a friend
// Acess:       Private
router.post(
    '/accept', 
    auth, 
    async (req, res) => {
        try {
            const { currRequester, currSpender } = req.body;

            // Check both user are in requesting and spending
            const isSpending = await Friend.exists(
                {
                    _id: currSpender,
                    spending: currRequester
                }
            );
            if (!isSpending) {
                return res.send('You cant add this user!');
            }
            
            // Add each other
            const requester = await Friend.findOneAndUpdate(
                { _id: currRequester }, 
                {
                    $pull: { requesting: currSpender },
                    $addToSet: { friends: currSpender }
                },
                { new: true }
            );

            const spender = await Friend.findOneAndUpdate(
                { _id: currSpender },
                {
                    $pull: { spending: currRequester },
                    $addToSet: { friends: currRequester }
                },
                { new: true }
            );

            res.send({ requester, spender })
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
)

// Type:        GET
// Where:       api/user
// Purpose:     Finding a specific friend (in friend, requesting, spending)
// Acess:       Private
router.get(
    '/view', 
    auth,
    async (req, res) => {
        try {
            const { searchUser } = req.body

            const isUser = await Friend.exists(
                { _id: searchUser }
            );
            if (!isUser) {
                return res.send('User not found');
            }

            // Not complete
            res.send("Valid");
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
);

module.exports = router;
