const socket = io('http://localhost:9000'); // Main namespace
const socket2 = io('http://localhost:9000/admin'); // Admin namespace

socket.on('messageFromServer', (dataFromServer)=>{
    console.log(dataFromServer);
    socket.emit("messageFromClient", "This is a message from the Client!")
});

socket2.on('welcome', (data)=>{
    console.log(data);
})

socket.on('joined', (msg)=>{
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
