const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');

// Type:         POST
// Where:        api/profile
// Purpose:      Creating a new profile for new user
// Access:       Private
router.post(
    '/new', 
    auth,
    async (req, res) => {
        try {
            const { user, status, bio, experience, field } = req.body;
            const newProfile = await Profile.create(
                {
                    _id: user,
                    status,
                    bio,
                    experience,
                    field
                }
            );

            res.send(newProfile);
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
);

// Type:        GET
// Where:       api/profile
// Purpose:     Getting the user and profile data to the owner to see
// Acess:       Private
router.get(
    '/me', 
    auth, 
    async(req, res) => {
        try {
            const { user } = req.query;

            const isProfile = await Profile.exists(
                { _id: user }
            )
            if (!isProfile) {
                return res.status(400).send('There is no profile for this user');
            }

            const getProfile = await Profile.findById(user).populate('_id').select('-__v');
            res.send(getProfile);
        }
        catch (err) {
            res.status(500).send('Server Error');
        }
    }
);

// Type:         GET
// Where:        api/profile
// Purpose:      Getting a specific user and their profile data for other users to view
// Access:       Private
router.get(
    '/others', 
    auth, 
    async (req, res) => {
        try {
            const { user } = req.body;
            
            const isProfile = await Profile.exists(
                { _id: user }
            );
            if (!isProfile) {
                return res.status(400).send('There is no profile for this user');
            }

            const getProfile = await Profile.findById(user).populate(
                '_id',
                ['firstName', 'lastName', 'email', 'avatar']
            );

            res.send(getProfile);
        }
        catch (err) {
            res.status(500).send('Server Error');
        }
    }
);

// Type:         GET
// Where:        api/profile
// Purpose:      Update the profile
// Access:       Private
router.post(
    '/update',
    auth,
    async (req, res) => {
        
    }
)

module.exports = router;
