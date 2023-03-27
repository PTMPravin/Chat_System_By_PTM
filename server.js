const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname+"/public/")));

io.on("connection", function(socket){
    socket.on("newuser", function(username){
        socket.broadcast.emit("update", username + "Joind The Conversation");
    });
    socket.on("exituser", function(username){
        socket.broadcast.emit("update", username + "Left The Conversation");
    });
    socket.on("chat", function(message){
        socket.broadcast.emit("chat", message);
    });
});

server.listen(7777,()=>{
    console.log("Server Started At Port Number 7171");
});