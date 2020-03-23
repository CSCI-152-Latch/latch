const express = require("express");
const router = express.Router();
const Friend = require('../../models/Friend');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

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
            const newFriends = await Friend.create(
                {
                    _id: user,
                    friends,
                    requesting,
                    spending
                }
            );

            return res.send(newFriends);
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
                return res.status(400).send('You have already requested this user!');
            }

            // Check if both user are friend
            const isFriend = await Friend.exists(
                { 
                    _id: newRequester, 
                    friends: newSpender 
                }
            );
            if (isFriend) {
                return res.status(400).send('This user is your friend already');
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
                        return res.status(400).send('Requester user doesn\'t exist');
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
                        return res.status(400).send('Spender user doesn\'t exist');
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
                return res.status(400).send('You dont know this user!');
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
                        res.status(400).send('Reqeuster doesn\'t have the spender');
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
                        res.status(400).send('Spender doesn\'t have the requester');
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
                return res.status(400).send('You don\'t have this user as a friend!');
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
                return res.status(400).send('You cant add this user!');
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
                return res.status(400).send('User not found');
            }

            // Side Note: This might be viewing the whole users
            res.send("Valid");
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
);

// Type:         GET
// Where:        api/profile
// Purpose:      Update user
// Access:       Private
router.post(
    '/update',
    auth,
    async (req, res) => {
        try {
            const { user } = req.body;

            const userUpdate = await User.findOneAndUpdate(
                { _id:  req.user.id}, 
                {
                    $set: user
                },
                { new: true }
            );
            return res.json(userUpdate);
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
)

// @route     POST api/user
// @desc      Get user data
// @access    Private
router.get(
    '/me', 
    auth, 
    async(req, res) => {
        try {
            const isUser = await User.exists(
                { _id: req.user.id }
            )
            if (!isUser) {
                return res.status(400).json({ msg: "You dont exist in this community" });
            }

            const getUser = await User.findById(req.user.id);
            
            res.json(getUser);
        }
        catch (err) {
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
