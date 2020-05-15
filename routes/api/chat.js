const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const Chat = require('../../models/Chat');

//==============================================================================================================//
//                                                                                                              //
//                                      @route     POST api/chat/create                                         //
//                                      @desc      Create chat list                                             //
//                                      @access    Private                                                      //
//                                                                                                              //
//==============================================================================================================//
router.post(
    '/create', 
    auth, 
    async (req, res) => {
        try {

            const currResponder = { '_id': req.user.id };
            const user = req.body
            
            const newChat = await Chat.create(
                { users: [currResponder, user] }
            );
            res.json(newChat);
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
);

// Type:         POST
// Where:        api/chat
// Purpose:      Add a message
// Access:       Private
router.post(
    '/add', 
    auth, 
    async (req, res) => {
        try {
            const userID = req.user.id;
            const { chatID, message, date } = req.body;

            const messages = await Chat.findByIdAndUpdate( 
                chatID,
                {
                    $push: {
                        messages: {
                            owner: userID,
                            message: message,
                            date: date
                        }
                    }
                },
                { 
                    projection: { messages: 1 },
                    new: true 
                }
            ).populate(
                {
                    path: 'messages.owner',
                    model: 'users',
                    select: '-email -password -date -__v'
                }
            );
            // Side note: Might get the first 10 recent message and not all them
            res.send(messages);
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
);

// Type:         POST
// Where:        api/chat
// Purpose:      Delete chat
// Access:       Private
router.post(
    '/delete', 
    auth, 
    async (req, res) => {
        const { chatID } = req.body;

        const isChat = await Chat.exists(
            { _id: chatID }
        );
        if (!isChat) {
            return res.send('Chat does not exist');
        }

        const deleteChat = await Chat.findByIdAndDelete(chatID);
        res.send(deleteChat);
    }
);

// Type:         GET
// Where:        api/chat
// Purpose:      Get the user chats
// Access:       Private
router.get('/rooms', auth, async (req, res) => {
    try {
        const user = req.user.id;

        const getChats = await Chat.find(
            { 
                users: {
                    _id: user
                } 
            }, 
            { __v: 0, messages: 0 }
        )
        .populate(
            {
                path: 'users._id',
                model: 'users',
                select: '-email -password -date -__v'
            }
        );
        console.log(getChats);
        res.json(getChats);
    }
    catch (err) {  
        res.status(500).send(err);
    }
});

router.get('/go', auth, async (req, res) => {
    try {
        const { chatID } = req.query

        const getChat = await Chat.findById(
            chatID,
            { messages: 1, _id: 0 }        
        ).populate(
            {
                path: 'messages.owner',
                model: 'users',
                select: '-email -password -date -__v'
            }
        );
        const { messages } = getChat;
        res.json({ chatID, messages });
    }
    catch (err) {  
        res.status(500).send(err);
    }
});

module.exports = router