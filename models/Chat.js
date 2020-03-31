const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    users: [String],
    title: {
        type: String,
        default: 'Bakl'
    },
    messages: [
        {
            _id: {
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