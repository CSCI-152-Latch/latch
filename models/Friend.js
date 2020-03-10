const mongoose = require('mongoose');

const FriendSchema = mongoose.Schema({
    friends: {
        type: Array
    },
    requesting: {
        type: Array
    },
    spending: {
        type: Array
    }
}, {_id: false});

module.exports = Friend = mongoose.model('friends', FriendSchema);