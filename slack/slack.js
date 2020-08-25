const express = require('express')
const socketio = require('socket.io')
const app = express()
app.use(express.static('public'))

const namespaces = require('./data/namespaces');
// console.log(namespaces[1].rooms)

const expressServer = app.listen(9000)

const io = socketio(expressServer)

// Main namespace
io.on('connection', (socket)=>{
    // Create an [array] to storage image
    const nsData = namespaces.map((ns)=>{
        return {
            img: ns.img,
            endpoint: ns.endpoint
        }
    })
    // console.log(nsData)
    // for sending data to client, i used socket because i want to have in 
    // any client side and i pose the nsData to client with socket
    socket.emit('nsList', nsData);
})
// namespaces of /wiki, /mozilla, /linux
namespaces.forEach(namespace=>{
    // console.log(namespace.endpoint);
    // Create a individual endpoints for any namespaces
    io.of(namespace.endpoint).on('connection', (nsSocket)=>{
        // Will show to client side
        console.log(`${nsSocket.id} has join with ${namespace.endpoint}`);

        nsSocket.emit("nsRoomLoad", namespace.rooms);
    })
})
