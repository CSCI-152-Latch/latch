const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    users: [{
        _id: {
            type: String,
            ref: 'users'
        }
    }],
    title: {
        type: String,
        default: 'Bakl'
    },
    messages: [
        {
            owner: {
                type: String,
                ref: 'users'
            },
            message: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now()
            }
        }
    ]
});

module.exports = Chat = mongoose.model('chats', ChatSchema);