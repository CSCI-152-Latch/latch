const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// Type:         GET
// Where:        api/profile
// Purpose:      Getting user profile data
// Access:       Private
router.get('/', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate(
            'user',
            ['firstName', 'lastName', 'email', 'avatar']
        );
        
        if (!profile) {
            return res.status(400).json({msg: 'There is no profile for this user'});
        }

        res.send(profile);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

// Type:         POST
// Where:        api/profile
// Purpose:      Creating a new profile
// Access:       Private
router.post(
    '/', 
    auth, 
    [
        check('user').notEmpty(),
        check('status').notEmpty()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() });
            }

            const { user, status, bio, experience, field} = req.body;
            const profile = new Profile({
                user,
                status,
                bio,
                experience,
                field
            });

            await profile.save();
            res.send(profile);
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
);

module.exports = router;
