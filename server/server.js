const express = require('express')();
const http = require('http').Server(express);
const io = require('socket.io')(http);

express.get('/', (req, res) => res.send("Hello World"));
http.listen(8000, () => console.log("server started"));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (message) => {
        io.emit('message', message);
        console.log(message);
    });
});