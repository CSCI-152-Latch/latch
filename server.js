const express = require("express");

const connectDB = require("./config/db"); //

const app = express();

connectDB(); //we are now connecting to DB

//initialize middleware
app.use(express.json({ extended:false }));//allow us to get the data from req.body

app.get("/", (req, res) => res.send("API Running"));

//the routes we will be using
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/chat", require("./routes/api/chat"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
