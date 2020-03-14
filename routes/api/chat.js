const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Chat = require('../../models/Chat');

// Type:         GET
// Where:        api/chat
// Purpose:      Get the user chats
// Access:       Private
router.get('/view', auth, async (req, res) => {
    try {
        const { user } = req.body;
        const userID = mongoose.Types.ObjectId(user);
        const chatList = await Chat.find({ users: { _id: userID }})

        res.send(chatList);
    }
    catch (err) {  
        res.status(500).send(err);
    }
})

// Type:         POST
// Where:        api/chat
// Purpose:      Create a chat
// Access:       Private
router.post('/group', auth, async (req, res) => {
    try {
        const users = req.body

        const chatList = new Chat({
           users: users
        })
        
        await chatList.save()
        res.send(req.body);
    }
    catch (err) {
        res.status(500).send(err);
    }
})

// Type:         POST
// Where:        api/chat
// Purpose:      Add a message
// Access:       Private
router.post('/message', auth, async (req, res) => {
    try {
        //req -> {messageID, userID, message}
        const { chatID, userID, message} = req.body;
        const currChat = Chat.findOne({_id: chatID, users: {_id: mongoose.Types.ObjectId(userID)}});

        currChat.messaging.push(message);
        //Something like this. Will chnage later

        await (await currChat).save();
        res.send(currChat);
    }
    catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router