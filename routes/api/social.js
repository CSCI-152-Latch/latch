const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
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

            const newFriendList = await Friend.create(
                {
                    _id: userID
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

            const newObjectID = mongoose.Types.ObjectId();

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
                        $addToSet: { 
                            requesters: {
                                _id: newObjectID,
                                user: newResponder
                            } 
                        }
                    },
                    { 
                        'new': true,
                        fields: 'requesters'
                    }
                ).populate({
                    path: 'requesters.user',
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
                        $addToSet: { 
                            responders: {
                                _id: newObjectID,
                                user: newRequester
                            } 
                        }
                    },
                    { 
                        'new': true,
                        fields: 'responders'
                    }
                ).populate({
                    path: 'responders.user',
                    model: 'users',
                })
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
                path: 'requesters.user',
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
                path: 'responders.user',
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
                path: 'friends.user',
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
                        $pull: { 
                            requesters: {
                                user: currResponder
                            } 
                        }
                    },
                    { 
                        new: true,
                        fields: 'requesters'
                    }
                ).populate({
                    path: 'requesters.user',
                    model: 'users'
                }),
                Friend.findOneAndUpdate(
                    { _id: currResponder },
                    {
                        $pull: { 
                            responders: {
                                user: currRequester
                            } 
                        }
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
                    { '_id': currRequester },
                    {
                        '$pull': { 
                            'friends': {
                                'user': currResponder
                            } 
                        }
                    },
                    { 
                        'new': true,
                        fields: 'friends'
                    }
                ).populate({
                    path: 'friends.user',
                    model: 'users'
                }),
                Friend.findOneAndUpdate(
                    { '_id': currResponder },
                    {
                        '$pull': { 
                            'friends': {
                                'user': currRequester
                            } 
                        }
                    },
                    { 'new': true }
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
            const newObjectID = mongoose.Types.ObjectId()

            const result = await Promise.all([
                Friend.findOneAndUpdate(
                    { '_id': currResponder },
                    {
                        '$pull': { 
                            'responders': {
                                'user': currRequester
                            } 
                        },
                        '$addToSet': { 
                            'friends': {
                                '_id': newObjectID,
                                'user': currRequester
                            } 
                        }
                    },
                    { 
                        'new': true,
                        fields: 'responders friends'
                    }
                ).populate([
                    {
                        path: 'responders.user',
                        model: 'users'
                    },
                    {
                        path: 'friends.user',
                        model: 'users'
                    }
                ]),
                Friend.findOneAndUpdate(
                    { '_id': currRequester },
                    {
                        '$pull': { 
                            'requesters': {
                                'user': currResponder
                            } 
                        },
                       '$addToSet': { 
                            'friends': {
                                '_id': newObjectID,
                                'user': currResponder
                            } 
                        }
                    },
                    { 'new': true }
                )
            ]);

            const [responder, _] = result;
            res.json(responder);         
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
                    { '_id': currResponder },
                    {
                        '$pull': { 
                            'responders': {
                                'user': currRequester
                            } 
                        }
                    },
                    { 
                        'new': true,
                        fields: 'responders'
                    }
                ).populate({
                    path: 'responders',
                    model: 'users'
                }),
                Friend.findOneAndUpdate(
                    { '_id': currRequester },
                    {
                        '$pull': { 
                            'requesters': {
                                'user': currResponder
                            } 
                        }
                    },
                    { 'new': true }
                )
            ]);

            const [requester, _] = result;
            res.json(requester);  
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

module.exports = router;