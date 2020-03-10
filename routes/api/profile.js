const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');

// Type:         GET
// Where:        api/profile
// Purpose:      Getting a specific user and their profile data for other users to view
// Access:       Private
router.get('/', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ _id: req.user.id }).populate(
            'user',
            ['firstName', 'lastName', 'email', 'avatar']
        );
        
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.send(profile);
    }
    catch (err) {
        res.status(500).send('Server Error');
    }
});

// Type:        GET
// Where:       api/profile
// Purpose:     Getting the user and profile data to the owner to see
// Acess:       Private
router.get('/', auth, async(req, res) => {
    try {
        const [profile] = await Profile.find({ _id: req.user.id }).populate('user');
        console.log(profile);
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.send(profile);
    }
    catch (err) {
        res.status(500).send('Server Error');
    }
})


// Type:         POST
// Where:        api/profile
// Purpose:      Creating a new profile for new user
// Access:       Private
router.post(
    '/', 
    // auth,
    async (req, res) => {
        try {
            const { user, status, bio, experience, field} = req.body;
            const profile = new Profile({
                _id: new mongoose.Types.ObjectId(user),
                status,
                bio,
                experience,
                field
            });

            await profile.save();
            res.send(profile);
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
);

module.exports = router;
