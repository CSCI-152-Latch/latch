const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocumentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  publishDate: {
    type: Date,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  coverImage: {
    type: String,
    required: true,
  },
  coverImageType: {
    type: String,
    required: true,
  },
  coverImageBuffer:{
    type:Buffer,
    required: true,
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "users",
  // },
});

DocumentSchema.virtual("coverImagePath").get(function () {
  if (this.coverImageBuffer != null && this.coverImageType != null) {
    return `data:${
      this.coverImageType
    };charset=utf-8;base64,${this.coverImageBuffer.toString("base64")}`;
  }
});

module.exports = Documents = mongoose.model("document", DocumentSchema);
