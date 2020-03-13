const express = require("express");
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
        const chatList = await Chat.findOne({users: user})

        res.send(chatList)
    }
    catch (err) {  
        res.status(500).send(err);
    }
})

// Type:         POST
// Where:        api/chat
// Purpose:      Create a group chat
// Access:       Private
router.post('/group', auth, async (req, res) => {
    try {
        const { users } = res.body
        const chatList = new Chat({
            users: users,
            messages: []
        })

        await chatList.save()
        res.send('It work');
    }
    catch (err) {
        res.status(500).send(err);
    }
})