const express = require('express')();
const http = require('http').Server(express);
const io = require('socket.io')(http);

express.get('/', (req, res) => res.send("Hello World"));
http.listen(8000, () => console.log("server started"));
const chat = io.of('/chat');
chat.on('connection', (socket) => {
    socket.on('message', (message) => {
        socket.broadcast.emit('message', message);
        socket.emit('message_received');
        console.log(message);
    });
});