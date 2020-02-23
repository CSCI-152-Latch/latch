const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator"); // better understanding on npm documentation
const User = require("../../models/User"); //importing teh user model
//express-validator helps making sure that the fileds are filled correctly


//Post   api/users
//      register
//      public (no token needed)
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Make sure email is valid").isEmail(),
    check("password", "Enter password minimum 6 characters").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    //console.log(req.body); when we want to check response in terminal
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //bad request
    } //for simplicity sake, we will deconstruct the req.body for the payload information
    const { name, email, password } = req.body;

    //making a new query using findone()
    try {
      //here are going to run a few checks to make to register the user
      //see if the user exists cause only unique emails**
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: "User exists" }] });
      }

      //get the gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      //this doesnt actually save the user it just creates an instance of the user
      user = new User({
        name,
        email,
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
      };

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
    } catch (err) {
      //if something goes wrong here then its a server error
      console.error(err.message);
      res.status(500).send("server error status 500");
    }
  }
);



module.exports = router;
