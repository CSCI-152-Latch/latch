const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    users: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    messages: [
        
    ]
});

module.exports = Chat = mongoose.model('chats', ChatSchema);