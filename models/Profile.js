const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    website: {
        type: String
    },

    status: {
        type: String
    },

    skills: {
        type: [String],
        require: true
    },

    bio: {
        type: String
    },

    experience: [
        {
            title: {
                type: String,
                require: true
            },
            company: {
                type: String,
                require: true
            },
            from: {
                type: Date,
                require: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            decription: {
                type: String
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linked_in: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);