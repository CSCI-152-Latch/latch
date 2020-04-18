const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    user: {
        type: String,
        ref: "users"
    },
    text: {
        type: String,
        required: true
    },
    likes: {
        count: {
            type: Number,
            default: 0
        },
        users: [{
            user: {
                type: String,
                ref: "users"
            }
        }]
    },
    comments: [{
        text: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now()
        }
    }],
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Post = mongoose.model("post", PostSchema);
