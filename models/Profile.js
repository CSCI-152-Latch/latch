const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    friend: {
        type: [String]
    },
    groups: {
        type: [String]
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);