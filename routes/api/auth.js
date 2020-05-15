const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require('../../middleware/auth')
const { check, validationResult, body } = require("express-validator");
const User = require("../../models/User");

// Type:         GET
// Where:        api/auth
// Purpose:      Testing
// Access:       Public
router.get( 
    "/", 
    auth,
    async (req, res) => {
        try {
            const { userID } = req.body
            const user = await User.findById(userID).select("-password");
            res.json(user);
        } catch (err) {
            console.error(err.message);

            res.status(500).send("Server error");
        }   
    }
);

// Type:         POST
// Where:        api/auth
// Purpose:      Registering
// Access:       Public
router.post(
    '/register',
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
        // Check data correspond to the validation for each field
        const areErrors = validationResult(req);

        // If there is atleast one error then it is bad request
        if (!areErrors.isEmpty()) {
            const errors = { errors: areErrors.array() };
            return res.status(400).json(errors); 
        } 

        // Unpacking the request body
        const { firstName, lastName, email, nickName, password } = req.body;

        // Staring a query
        try {
            // Check if the email is unique
            const isEmail = await User.exists(
                { email: email }
            );
            if (isEmail) {
                const errors = { 
                    errors: [
                        { msg: "Email already taken" }
                    ] 
                };
                return res.status(400).json(errors);
            }
            
            // Check if the nickName is unique
            const isNickname = await User.exists(
                { nickName: nickName }
            );
            if (isNickname) {
                const errors = { 
                    errors: [
                        { msg: "Nickname already taken" }
                    ] 
                };
                return res.status(400).json(errors);
            }

            // Get the gravatar
            const avatar = gravatar.url(email, {
                s: "200",
                r: "pg",
                d: "retro"
            });

            // Creating an encryption for password with bycrypt js
            // The salt is what will be hashing
            const salt = await bcrypt.genSalt(10); 
            const encryptPassword = await bcrypt.hash(password, salt);

            // Create a new user
            const newUser = await User.create(
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    nickName: nickName,
                    avatar: avatar,
                    password: encryptPassword
                }
            );

            // Using user ID for our payload
            const payload = {
                user: {
                    id: newUser._id
                }
            }

            // Returning a JsonWebToken for traversing through protected routes
            jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: "20d" },
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.json({ token });
                }
            );
        } 
        catch (err) {
            res.status(500).send("Server error status 500");
        }
    }
);


// Type:        POST
// Where:       api/auth
// Purpose:     Login
// Acess:       Public
router.post(
    '/login',
    [
        check('email')
            .notEmpty().withMessage('Email is require')
            .isEmail().withMessage('Email must be in correct format'),
            
        check('password')
            .notEmpty().withMessage('Password is require')
    ],
    async (req, res) => {
        // Check data correspond to the validation for each field
        const areErrors = validationResult(req);

        // If there is atleast one error then it is bad request
        if (!areErrors.isEmpty()) {
            const errors = { errors: areErrors.array() };
            return res.status(400).json(errors); 
        } 

        // Unpacking the request body
        const { email, password } = req.body;

        // Starting a new query
        try {
            // Check if email exist
            const isEmail = await User.exists(
                { email: email }
            );
            if (!isEmail) {
                const error = { 
                    errors: [
                        { msg: "Invalid Credentials" }
                    ] 
                };
                return res.status(400).json(error);
            }

            const getUser = await User.findOne(
                { email: email }
            ).select('password')

            // Check if password is match
            const isMatch = await bcrypt.compare(password, getUser.password);
            if (!isMatch) {
                const error = { 
                    errors: [
                        { msg: "Invalid Credentials" }
                    ] 
                };
                return res.status(400).json(error);
            }
            
            // Using user ID for our payload
            const payload = {
                user: {
                    id: getUser._id
                }
            };

            // Returning a JsonWebToken for traversing through protected routes
            jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: "20d" },
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.json({ token });
                }
            );
        } 
        catch (err) {
            res.status(500).send("Server error status 500");
        }
    }
);

module.exports = router;
