const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    users: [mongoose.Types.ObjectId],
    messages: [{
        text: String,
        user: mongoose.Types.ObjectId
    }]
});