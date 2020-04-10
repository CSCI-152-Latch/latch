const express = require("express");
const router = express.Router();
const Friend = require('../../models/Friend');
const auth = require('../../middleware/auth');

//==============================================================================================================//
//                                                                                                              //
//                                      @route     POST api/social/create                                       //
//                                      @desc      Create friend list                                           //
//                                      @access    Private                                                      //
//                                                                                                              //
//==============================================================================================================//
router.post(
    '/create', 
    auth,
    async (req, res) => {
        try {
            const userID = req.user.id;
            const { friends, requesters, responders } = req.body;

            const newFriendList = await Friend.create(
                {
                    _id:        userID,
                    friends:    friends,
                    requesters: requesters,
                    responders: responders
                }
            );
            res.json(newFriendList);
        }
        catch (err) {
            res.status(500).json(err);  
        }
    }
);

//==============================================================================================================//
//                                                                                                              //
//                                      @route     POST api/social/user                                         //
//                                      @desc      Get user connection                                          //
//                                      @access    Private                                                      //
//                                                                                                              //
//==============================================================================================================//
router.get(
    '/user',
    auth,
    async (req, res) => {
        try {
            const userID = req.user.id;

            const getConnection = await Friend.findById(
                { _id: userID },
                { _id: 0, __v: 0 }
            ).populate([
                {
                    path: 'friends',
                    model: 'users'
                },
                {
                    path: 'requesters',
                    model: 'users'
                },
                {
                    path: 'responders',
                    model: 'users'
                }
            ]);
            res.json(getConnection);
        }
        catch (err) {
            res.status(500).json(err);
        }  
    }
);

//==============================================================================================================//
//                                                                                                              //
//                                      @route     POST api/social/add                                          //
//                                      @desc      Add users                                                    //
//                                      @access    Private                                                      //
//                                                                                                              //
//==============================================================================================================//
router.post(
    '/add', 
    auth, 
    async (req, res) => {
        try {
            const newRequester = req.user.id;
            const { newResponder } = req.body

            const result = await Promise.all([
                Friend.findOneAndUpdate(
                    {   
                        $and: [
                            { _id: newRequester },
                            {
                                $nor: [
                                    { requesters: newResponder }, 
                                    { friends: newResponder }
                                ]
                            } 
                        ]
                    },
                    {
                        $addToSet: { requesters: newResponder }
                    },
                    { 
                        new: true,
                        fields: 'requesters'
                    }
                ).populate({
                    path: 'requesters',
                    model: 'users',
                }),
                Friend.findOneAndUpdate(
                    { 
                        $and: [
                            { _id: newResponder },
                            {
                                $nor: [
                                    { responders: newRequester },
                                    { friends: newRequester }
                                ]
                            } 
                        ]
                    },
                    {
                        $addToSet: { responders: newRequester }
                    },
                    { new: true }
                )
            ]);
            
            const [requesters, _] = result; 
            res.json(requesters);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
);

//==============================================================================================================//
//                                                                                                              //
//                                      @route     POST api/social/requesters                                   //
//                                      @desc      Get request list                                             //
//                                      @access    Private                                                      //
//                                                                                                              //
//==============================================================================================================//
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
            res.json(getRequesters);
        }
        catch (err) {
            res.status(500).json(err);
        }  
    }
);


//==============================================================================================================//
//                                                                                                              //
//                                      @route     POST api/social/responders                                   //
//                                      @desc      Get responders list                                          //
//                                      @access    Private                                                      //
//                                                                                                              //
//==============================================================================================================//
router.get(
    '/responders',
    auth,
    async (req, res) => {
        try {
            const userID = req.user.id;

            const getResponders = await Friend.findOne(
                { _id: userID },
                { responders: 1 }
            ).populate({
                path: 'responders',
                model: 'users'
            });
            res.json(getResponders);
        }
        catch (err) {
            res.status(500).json(err);
        }
        
    }
);

//==============================================================================================================//
//                                                                                                              //
//                                      @route     POST api/social/friends                                      //
//                                      @desc      Get friend list                                              //
//                                      @access    Private                                                      //
//                                                                                                              //
//==============================================================================================================//
router.get(
    '/friends', 
    auth,
    async (req, res) => {
        try {
            const userID = req.user.id;

            const getFriends = await Friend.findOne(
                { _id: userID },
                { friends: 1 }
            ).populate({
                path: 'friends',
                model: 'users'
            });
            res.json(getFriends);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
);

//==============================================================================================================//
//                                                                                                              //
//                                      @route     POST api/social/cancel                                       //
//                                      @desc      Cancel friend request                                        //
//                                      @access    Private                                                      //
//                                                                                                              //
//==============================================================================================================//
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
                    { 
                        new: true,
                        fields: 'requesters'
                    }
                ).populate({
                    path: 'requesters',
                    model: 'users'
                }),
                Friend.findOneAndUpdate(
                    { _id: currResponder },
                    {
                        $pull: { responders: currRequester }
                    },
                    { new: true }
                )
            ]);

            const [requesters, _] = result; 
            res.json(requesters);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
);


//==============================================================================================================//
//                                                                                                              //
//                                      @route     POST api/social/delete                                       //
//                                      @desc      Delete friends                                               //
//                                      @access    Private                                                      //
//                                                                                                              //
//==============================================================================================================//
router.post(
    '/delete', 
    auth, 
    async (req, res) => {
        try {
            const currRequester = req.user.id;
            const { currResponder } = req.body;

            const result = await Promise.all([
                Friend.findOneAndUpdate(
                    {
                        $and: [
                            { _id: currRequester },
                            { friends: currResponder }
                        ]
                    },
                    {
                        $pull: { friends: currResponder }
                    },
                    { 
                        new: true,
                        fields: 'friends'
                    }
                ).populate({
                    path: 'friends',
                    model: 'users'
                }),
                Friend.findOneAndUpdate(
                    {
                        $and: [
                            { _id: currResponder },
                            { friends: currRequester }
                        ]
                    },
                    {
                        $pull: { friends: currRequester }
                    },
                    { new: true }
                )
            ]); 

            const [requester, _] = result; 
            res.json(requester);
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
);

//==============================================================================================================//
//                                                                                                              //
//                                      @route     POST api/social/accept                                       //
//                                      @desc      Accept friends                                               //
//                                      @access    Private                                                      //
//                                                                                                              //
//==============================================================================================================//
router.post(
    '/accept', 
    auth, 
    async (req, res) => {
        try {
            const currResponder = req.user.id;
            const { currRequester } = req.body;

            const result = await Promise.all([
                Friend.findOneAndUpdate(
                    {
                        $and: [
                            { _id: currResponder },
                            { responders: currRequester }
                        ]
                    },
                    {
                        $pull: { responders: currRequester },
                        $addToSet: { friends: currRequester }
                    },
                    { 
                        new: true,
                        fields: 'responders friends'
                    }
                ).populate([
                    {
                        path: 'responders',
                        model: 'users'
                    },
                    {
                        path: 'friends',
                        model: 'users'
                    }
                ]),
                Friend.findOneAndUpdate(
                    {
                        $and: [
                            { _id: currRequester },
                            { requesters: currResponder }
                        ]
                    },
                    {
                        $pull: { requesters: currResponder },
                        $addToSet: { friends: currResponder }
                    },
                    { new: true }
                )
            ]);

            const [requester, _] = result;
            res.json(requester);         
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
)

//==============================================================================================================//
//                                                                                                              //
//                                      @route     POST api/social/decline                                      //
//                                      @desc      Decline friends                                              //
//                                      @access    Private                                                      //
//                                                                                                              //
//==============================================================================================================//
router.post(
    '/decline', 
    auth, 
    async (req, res) => {
        try {
            const currResponder = req.user.id;
            const { currRequester } = req.body;

            const result = await Promise.all([
                Friend.findOneAndUpdate(
                    {
                        $and: [
                            { _id: currResponder },
                            { responders: currRequester }
                        ]
                    },
                    {
                        $pull: { responders: currRequester }
                    },
                    { 
                        new: true,
                        fields: 'responders'
                    }
                ).populate({
                    path: 'responders',
                    model: 'users'
                }),
                Friend.findOneAndUpdate(
                    {
                        $and: [
                            { _id: currRequester },
                            { requesters: currResponder }
                        ]
                    },
                    {
                        $pull: { requesters: currResponder }
                    },
                    { new: true }
                )
            ]);

            const [requester, _] = result;
            res.json(requester);  
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
)

module.exports = router;