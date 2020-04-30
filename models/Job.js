const mongoose = require("mongoose");

const JobSchema = mongoose.Schema({
  organization: {
    //people who post the job
    type: String,
    required: true,
  },
  // avatarj: {
  //   //give an avatar to the people who post the job
  //   type: String,
  // },
  titlej: {
    //title of the job
    type: String,
    required: true,
  },
  description: {
    //description of the job
    type: String,
    required: true,
  },
  typej: {
    //type of the job i.e. full time, intership, part-time
    type: String,
    required: true,
  },
  qualifications: {
    //list of qualifications for the job
    type: [String],
    default: [],
  },
  postingDate: {
    //date job was posted
    type: Date,
    default: Date.now(),
  },
  endDate: {
    //last day to apply
    type: Date,
    required: true,
  },
  applicants: [
    {
      name: {
        //object to hold applicants id
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  // currentj: {
  //   //a bool to see if the job is current or not
  //   type: Boolean,
  //   default: false,
  // },
  // numApps: {
  //   type: Number,
  //   default: 0,
  // },
});

module.exports = Job = mongoose.model("jobs", JobSchema);
