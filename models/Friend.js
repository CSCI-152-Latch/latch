const mongoose = require('mongoose');

const FriendSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    friends: {
        type: [String],
        ref: 'users'
    },
    requesters: {
        type: [String],
        ref: 'users'
    },
    responders: {
        type: [String],
        ref: 'users'
    }
});

module.exports = Friend = mongoose.model('friends', FriendSchema);