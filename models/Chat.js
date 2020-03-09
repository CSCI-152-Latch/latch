const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    users: [],
    messages: [{
        text: String,
        user: mongoose.Types.ObjectId
    }]
});