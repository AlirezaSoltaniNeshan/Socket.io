const express = require('express')
const socketio = require('socket.io')
const app = express()

app.use(express.static('public'))

const expressServer = app.listen(9000)

const io = socketio(expressServer)
// The main namespace
io.on('connection', (socket)=>{
    socket.emit("messageFromServer", "This is a message from the Server!")
    socket.on('messageFromClient', (dataFromClient)=>{
        console.log(dataFromClient)
    })

    socket.join('level1');
    // To broadcasting entire server:
    io.of('/').to('level1').emit("joined", `${socket.id} says: you're connected to Level 1`)
})
// The admin namespace
io.of('/admin').on('connection', (socket)=>{
    console.log("Someones connected to admin namespace!");
    // io because entire server!
    io.of('/admin').emit("welcome", "Welcome to the admin channel!");
})