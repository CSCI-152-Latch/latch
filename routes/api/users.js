const express = require("express");
const router = express.Router();
const Friend = require('../../models/Friend');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route     POST api/users/friend
// @desc      Create a friend list
// @access    Private
router.post(
    '/friend', 
    auth,
    async (req, res) => {
        try {
            const userID = req.user.id;
            const { friends, requesting, spending } = req.body;
            const newFriends = await Friend.create(
                {
                    _id:        userID,
                    friends:    friends,
                    requesting: requesting,
                    spending:   spending
                }
            );

            return res.json(newFriends);
        }
        catch (err) {
            res.status(500).send(err);  
        }
    }
);

// @route     POST api/users/add
// @desc      Request a user to be friend
// @access    Private
router.post(
    '/add', 
    auth, 
    async (req, res) => {
        try {
            const newRequester  = req.user.id;
            const { newSpender } = req.body;

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
            const currRequester = await Friend.findOneAndUpdate(
                { _id: newRequester },
                {
                    $addToSet: { requesting: newSpender }
                },
                { new: true }
            );

            const currSpender = await Friend.findOneAndUpdate(
                { _id: newSpender }, 
                {
                    $addToSet: { spending: newRequester } 
                },
                { new: true }
            );
            
            res.json({ currRequester, currSpender });
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
);

// @route     POST api/users/cancel
// @desc      Cancel friend request
// @access    Private
router.post(
    '/cancel', 
    auth, 
    async (req, res) => {
        try {
            const currSpender = req.user.id;
            const { currRequester } = req.body;

            // Check if both user are in request and spending
            const isRequest = await Friend.exists(
                {
                    _id: currSpender,
                    requesting: currRequester
                }
            ); 
            if (!isRequest) {
                return res.status(400).send('You dont know this user!');
            }

            // Cancel the request and spending
            const requester = await Friend.findOneAndUpdate(
                { _id: currSpender },
                {
                    $pull: { requesting: currRequester }
                },
                { new: true }
            );

            const spender = await Friend.findOneAndUpdate(
                { _id: currRequester },
                {
                    $pull: { spending: currSpender }
                },
                { new: true }
            );

            res.send({ requester, spender });
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
);

// @route     POST api/users/delete
// @desc      Delete a user from friend list
// @access    Private
router.post(
    '/delete', 
    auth, 
    async (req, res) => {
        try {
            const currSpender= req.user.id;
            const { currRequester } = req.body;

            // This check if both user are friend
            const isFriend = await Friend.exists(
                { 
                    _id: currSpender, 
                    friends: currRequester
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

// @route     POST api/users/accept
// @desc      Accepting a user 
// @access    Private
router.post(
    '/accept', 
    auth, 
    async (req, res) => {
        try {
            const currSpender = req.user.id;
            const { currRequester } = req.body;

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

// @route     POST api/users/decline
// @desc      Decline the user friend request
// @access    Private
router.post(
    '/decline', 
    auth, 
    async (req, res) => {
        try {
            const currSpender = req.user.id;
            const { currRequester } = req.body;

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
            
            // Delete each other
            const requester = await Friend.findOneAndUpdate(
                { _id: currRequester }, 
                {
                    $pull: { requesting: currSpender }
                },
                { new: true }
            );

            const spender = await Friend.findOneAndUpdate(
                { _id: currSpender },
                {
                    $pull: { spending: currRequester }
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

// @route     POST api/users/view
// @desc      View friends list
// @access    Private
router.get(
    '/view', 
    auth,
    async (req, res) => {
        try {
            const userID = req.user.id
            
            const isUser = await Friend.exists(
                { _id: userID }
            );
            if (!isUser) {
                return res.status(400).send('User not found');
            }

            const getFriends = await Friend.findOne(
                { _id: userID }
            ).select('-spending -__v -_id -requesting')

            const getUsers = await Promise.all(
                getFriends.friends.map((friend) => {
                    return User.findOne(
                        { _id: friend }
                    ).select('-password -email -__v -date');
                })
            );

            res.send(getUsers);
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
);

// @route     POST api/users/spending
// @desc      Get spending list
// @access    Private
router.get(
    '/spending',
    auth,
    async (req, res) => {
        try {
            const userID = req.user.id;

            const getSpenders = await Friend.findOne(
                {_id: userID}
            ).select('-friends -__v -_id -requesting');

            const getUsers = await Promise.all(
                getSpenders.spending.map((spender) => {
                    return User.findOne(
                        { _id: spender }
                    ).select('-password -email -__v -date');
                })
            );

            return res.json(getUsers);
        }
        catch (err) {
            res.status(500).send(err);
        }
        
    }
);

// @route     POST api/users/request
// @desc      Get request list
// @access    Private
router.get(
    '/request',
    auth,
    async (req, res) => {
        try {
            const userID = req.user.id;

            const getRequest = await Friend.findOne(
                {_id: userID}
            ).select('-friends -__v -_id -spending');

            const getUsers = await Promise.all(
                getRequest.requesting.map((requester) => {
                    return User.findOne(
                        { _id: requester }
                    ).select('-password -email -__v -date');
                })
            );

            return res.json(getUsers);
        }
        catch (err) {
            res.status(500).send(err);
        }
        
    }
);

// @route     POST api/users/update
// @desc      Update user data
// @access    Private
router.post(
    '/update',
    auth,
    async (req, res) => {
        try {
            const userID = req.user.id;
            const { firstName, lastName, email, nickName, avatar, password, date } = req.body; 

            const userUpdate = await User.findOneAndUpdate(
                { _id:  userID}, 
                {
                    $set: {
                        firstName,
                        lastName,
                        email,
                        nickName,
                        avatar,
                        password,
                        date
                    }
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