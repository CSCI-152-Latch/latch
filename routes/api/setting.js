const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route     POST api/setting
// @desc      Get the current user data. 
// @access    Private
router.get(
    '/me', 
    auth, 
    async(req, res) => {
        try {
            const userID  = req.user.id;

            const getUser = await User.findById(
                userID, 
                { _id: 0, __v: 0, password: 0 }
            );
            res.json(getUser);
        }
        catch (err) {
            res.status(500).send('Server Error');
        }
    }
);

// @route     POST api/setting
// @desc      Update the current user
// @access    Private
router.post(
    '/update',
    auth,
    async (req, res) => {
        try {
            const userID   = req.user.id;
            const userData = req.body;

            const userUpdate = await User.findOneAndUpdate(
                { _id:  userID }, 
                {
                    $set: userData
                },
                { 
                    new: true
                }
            );
            res.json(userUpdate);
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
)

module.exports = router;