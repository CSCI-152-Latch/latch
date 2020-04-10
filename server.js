const express = require("express");
const socketIO = require('socket.io');
const http = require('http')

const connectDB = require("./config/db");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connect', (socket) => {
    socket.on('SEND_MESSAGE', data => {
        io.emit('RECEIVE_MESSAGE', data)
    });

    // socket.on('GET_THIS_CHAT', data => {
    //     io.emit('RECEIVE_CHAT', data);
    // });

    socket.on('disconnect', () => {
        console.log('User have left');
    });
}); 

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

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));