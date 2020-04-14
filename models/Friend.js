const mongoose = require('mongoose');

const FriendSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    friends: {
        type: [Object],
        ref: 'users'
    },
    requesters: {
        type: [Object],
        ref: 'users'
    },
    responders: {
        type: [Object],
        ref: 'users'
    }
});

module.exports = Friend = mongoose.model('friends', FriendSchema);