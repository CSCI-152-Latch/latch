const mongoose = require('mongoose');

const FriendSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    friends: {
        type: [Object]
    },
    requesters: {
        type: [Object]
    },
    responders: {
        type: [Object]
    }
});

module.exports = Friend = mongoose.model('friends', FriendSchema);