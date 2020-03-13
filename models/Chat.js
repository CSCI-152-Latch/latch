const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    users: [{
        user: mongoose.Types.ObjectId,
        ref: 'users'
    }],
    messages: [{
        text: String,
        user: mongoose.Types.ObjectId,
        date: Date.now()
    }]
});