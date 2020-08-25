const http = require('http')
const websocket = require('ws')

const server = http.createServer((req, res)=>{
    res.end("I'm connected")
})

// Convert the server obj to WebSocket Protocol (1)
const wss = new websocket.Server({server})

// Showing the headers of WebSocketServer
// wss.on("headers", (headers, req)=>{
//     console.log(headers)
// })
// Showing the Message on the client 
wss.on("connection", (ws, req)=>{
    // Console.log(req)
    ws.send("Welcome to WebSocket server!!!")
    ws.on("message", (msg)=>{
        console.log(msg)
    })
})


server.listen(8000)