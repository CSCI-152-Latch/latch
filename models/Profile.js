const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    user: {             //User ID
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    status: {           //Job position              
        type: String
    },
    bio: {              //About them
        type: String,
        default: ''
    },
    experience: {       //Their experience
        title: {
            type: String
        },
        company: {
            type: String
        },
        from: {
            type: Date
        },
        to: {
            type: Date
        },
        current: {
            type: Boolean
        },
        decription: {
            type: String
        },
    },
    field: {           //The fields or subjects they are in 
        type: [String],
        default: []
    }
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);