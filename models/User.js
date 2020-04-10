const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {            // Their first name
        type: String,       // Might use Regex
        required: true
    },
    lastName: {             // Thier last name
        type: String,
        required: true
    },
    email: {                // Thier email
        type: String,
        required: true,
        unique: true
    },
    nickName: {             // User nickname
        type: String,
        required: true,
        unique: true
    },
    password: {             // Thier password in encrypt
        type: String,
        required: true
    },
    avatar: {               // Thier profile image
        type: String,
    },
    date: {                 // When they created thier account   
        type: Date,
        default: Date.now()
    }
});

module.exports = User = mongoose.model("users", UserSchema);
