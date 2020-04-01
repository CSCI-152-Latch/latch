const express = require("express");
const router = express.Router();
const Friend = require('../../models/Friend');
const auth = require('../../middleware/auth');

// @route     POST api/social/requesters
// @desc      Get request list
// @access    Private
router.get(
    '/requesters',
    auth,
    async (req, res) => {
        try {
            const userID = req.user.id;

            const getRequesters = await Friend.findOne(
                { _id: userID },
                { requesters: 1 }
            ).populate({
                path: 'requesters',
                model: 'users'
            });

            const { requesters } = getRequesters;
            res.json(requesters);
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
    '/spendings',
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

// @route     POST api/users/view
// @desc      View friends list
// @access    Private
router.get(
    '/friends', 
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

// @route     POST api/users/friend
// @desc      Create a friend list
// @access    Private
router.post(
    '/create', 
    auth,
    async (req, res) => {
        try {
            // const userID = req.user.id;
            const { userID, friends, requesters, responders } = req.body;

            const newFriends = await Friend.create(
                {
                    _id:        userID,
                    friends:    friends,
                    requesters: requesters,
                    responders: responders
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

// @route     POST api/social/cancel
// @desc      Cancel friend request
// @access    Private
router.post(
    '/cancel', 
    auth, 
    async (req, res) => {
        try {
            
            const currRequester = req.user.id;
            const { currResponder } = req.body

            const result = await Promise.all([
                Friend.findOneAndUpdate(
                    { _id: currRequester }, 
                    {
                        $pull: { requesters: currResponder }
                    },
                    { new: true }
                ),
                Friend.findOneAndUpdate(
                    { _id: currResponder },
                    {
                        $pull: { responders: currRequester }
                    },
                    { new: true }
                )
            ]);
        
            res.send(result);
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

module.exports = router;