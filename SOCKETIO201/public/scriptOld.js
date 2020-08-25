const socket = io('http://localhost:9000'); // Main namespace
const socket2 = io('http://localhost:9000/admin'); // Admin namespace

socket.on("connect", ()=>{
    console.log(socket.id)
})

socket2.on('connect', ()=>{
    console.log(socket2.id)
})

socket2.on("welcome", (msg)=>{
    console.log(msg)
})

document.querySelector('#message-form').addEventListener('submit', (event)=>{
    event.preventDefault()
    const userMessage = document.querySelector('#user-message').value;
    const username = document.querySelector('#username').value;
    if(userMessage != "")
        socket.emit("userMessage", {text: userMessage, username: username})
})

socket.on('serverMessage', (serverMessage)=>{
    document.querySelector('#messages').innerHTML += `<li>${serverMessage.username}-${serverMessage.text}</li>`;
})
