const express = require("express");
const router = express.Router();
const Friend = require('../../models/Friend');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route     POST api/users/me
// @desc      Get user data
// @access    Private
router.get(
    '/me', 
    auth, 
    async(req, res) => {
        try {
            const userID = req.user.id;

            const getUser = await User.findById(userID);
            
            res.json(getUser);
        }
        catch (err) {
            res.status(500).send('Server Error');
        }
    }
);

// @route     POST api/users/others
// @desc      Get other user data
// @access    Private
router.get(
    '/others', 
    auth, 
    async(req, res) => {
        try {
            const { userID } = req.query;

            const getUser = await User.findById(userID);
            
            res.json(getUser);
        }
        catch (err) {
            res.status(500).send('Server Error');
        }
    }
);

// @route     POST api/users/all
// @desc      Get all user data beside the owner (Adding friend purpose)
// @access    Private
router.get(
    '/all',
    auth,
    async (req, res) => {
        try {
            const userID = req.user.id;

            const getUsers = await User.find(
                {
                    _id: {
                        $ne: userID
                    }
                }
            ).select('-password -email -__v -date').limit(5);
        
            res.json(getUsers);
        }
        catch (err) {
            res.status(500).send('Server Error');
        }
    }
)

module.exports = router;