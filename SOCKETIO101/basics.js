const http = require('http')
const socketIo = require('socket.io')

const server = http.createServer((req, res)=>{
    res.end("I'm connected!!!")
})

const io = socketIo(server)

io.on('connection', (socket, req)=>{
    // Emit for sending data 
    socket.emit("welcome", "Welcome to my socket io server")
    // on for getting data
    socket.on("message", (message)=>{
        console.log(message)
    })
})

server.listen(8000);