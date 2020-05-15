const mongoose = require("mongoose");

const config = require("config");

const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    //we use try catches so if something fails it can output a message so we know where it went wrong.
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }); //we do this so we can use async / await like promises

    console.log("MongoDB Latched..");
  } catch (err) {
    console.error(err.message);
    process.exit(1); //exit process with a failure
  }
};

module.exports = connectDB;
