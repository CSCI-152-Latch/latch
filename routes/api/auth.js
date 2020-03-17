const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

// Type:        POST
// Where:       api/auth
// Purpose:     Login
// Acess:       Public
router.post(
    '/',
    [
        check('email')
            .notEmpty().withMessage('Email is require')
            .isEmail().withMessage('Email must be in correct format'),
            
        check('password')
            .notEmpty().withMessage('Password is require')
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); //bad request
        } 
        //for simplicity sake, we will deconstruct the req.body for the payload information
        const { email, password } = req.body;

        //making a new query using findone()
        try {
            //here are going to run a few checks to make to register the user
            //see if the user exists cause only unique emails**
            let user = await User.findOne({ email });
            if (!user) {
                return res
                .status(400)
                .json({ errors: [{ msg: "invalid credentials" }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res
                .status(400)
                .json({ errors: [{ msg: "invalid credentials" }] });
            }

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
                { expiresIn: 36000000000 },
                (err, token) => {
                if (err) throw err;
                res.json({ token });
                }
            );
        } 
        catch (err) {
            //if something goes wrong here then its a server error
            console.error(err.message);
            res.status(500).send("server error status 500");
        }
    }
);

module.exports = router;
