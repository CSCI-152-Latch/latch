const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    status: {           //Job position              
        type: String
    },
    bio: {              //About them
        type: String,
        default: ''
    },
    experience: [       //Their experience
        {       
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
        }
    ],
    field: {           //The fields or subjects they are in 
        type: [String],
        default: []
    }
}, {_id: false});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);