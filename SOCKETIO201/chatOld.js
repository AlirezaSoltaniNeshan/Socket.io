const express = require('express')
const socketio = require('socket.io')
const app = express()

app.use(express.static('public'))

const expressServer = app.listen(9000)

const io = socketio(expressServer, {
    path: '/socket.io',
    serveClient: true,
    wsEngine: 'ws'
})

io.on('connection', (socket)=>{
    socket.on('userMessage', (usrMsg)=>{
        io.emit('serverMessage', {text: usrMsg.text, username: usrMsg.username})
    })
})

io.of('/admin').on('connection', (socket)=>{
    console.log("Someones connected to admin namespace!");
    // io because entire server!
    io.of('/admin').emit("welcome", "Welcome to the admin channel!");
})