const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    user: {             //User ID
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    status: {           //Job position              
        type: String,
        required: true
    },
    bio: {              //About them
        type: String
    },
    experience: {       //Thier experience
        title: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        from: {
            type: Date,
            required: true
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
    },
    field: {           //The fields or subjects they are in 
        type: [String]
    }
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);