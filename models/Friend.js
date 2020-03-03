const mongoose = require('mongoose');

const FriendSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    friends: {
        type: Array
    },
    requesting: {
        type: Array
    },
    spending: {
        type: Array
    }
});

module.exports = Friend = mongoose.model('friends', FriendSchema);