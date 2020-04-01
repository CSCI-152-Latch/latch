const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');

const Chat = require('../../models/Chat');

// Type:         GET
// Where:        api/chat
// Purpose:      Get the user chats
// Access:       Private
router.get('/view', auth, async (req, res) => {
    try {
        const user = req.user.id;

        const chats = await Chat.find(
            { users: user }
        );

        res.send(chats);
    }
    catch (err) {  
        res.status(500).send(err);
    }
})

// Type:         POST
// Where:        api/chat/create
// Purpose:      Create a chat
// Access:       Private
router.post(
    '/create', 
    auth, 
    async (req, res) => {
        try {

            const user = req.user.id;
            const { users } = req.body
            
            const chat = await Chat.create(
                { users: [user, users] }
            );

            res.send(chat)
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
    '/message', 
    auth, 
    async (req, res) => {
        try {
            const { chatID, userID, message } = req.body;

            const isChat = await Chat.exists(
                { _id: chatID }
            )
            if (!isChat) {
                return res.send('Chat does not exist');
            }

            const addMessage = await Chat.findByIdAndUpdate( 
                chatID,
                {
                    $push: {
                        messages: {
                            _id: userID,
                            message: message
                        }
                    }
                },
                { new: true }
            );
            // Side note: Might get the first 10 recent message and not all them
            res.send(addMessage);
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
        res.send('deleteChat');
    }
);

module.exports = router