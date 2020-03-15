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
        {
            message: {
                type: String
            },
            owner: {
                type: String,
                ref: 'users'
            },
            date: {
                type: Date,
                default: Date.now()
            }
        }
    ]
});

module.exports = Chat = mongoose.model('chats', ChatSchema);