const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  _id: {
    //User ID
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  status: {
    //Job position
    type: String,
  },
  bio: {
    //About them
    type: String,
    default: "",
  },
  experience: [
    //Their experience
    {
      title: {
        type: String,
      },
      company: {
        type: String,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
  },
  fields: {
    //The fields or subjects they are in
    type: [String],
    default: [],
  },
  hobbies:{
    //the hobbies they are into..
    type: [String],
    default: []
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
