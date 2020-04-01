const express = require("express");

const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB(); 

// Initialize middleware and allow us to get the data from request body 
app.use(express.json({ extended:false }));


//the routes we will be using
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/chat", require("./routes/api/chat"));
app.use("/api/setting", require("./routes/api/setting"));
app.use('/api/social', require('./routes/api/social'));
//app.use("/api/communityForum", require("./routes/api/communityForum"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
