const socket = io('http://localhost:9000'); // Main endpoint
socket.on('connect', ()=>{
    console.log(socket.id);
});

socket.on('nsList', (nsData)=>{
    // console.log(nsData)
    const namespacesDiv = document.querySelector('.namespaces');
    namespacesDiv.innerHTML = "";
    nsData.forEach((ns)=>{
        namespacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.img}"/></div>`
    });

    // Create listener for each namespace class to click:
    // below we have HTML Collection is not a array list!
    // So we convert to ES6 mechanism
    // console.log(document.getElementsByClassName('.namespace'))
    Array.from(document.getElementsByClassName('namespace')).forEach((elem)=>{
        elem.addEventListener('click', (e)=>{
            const nsEndpoint = elem.getAttribute('ns');
            // console.log(nsEndpoint)
            const nsSocket = io(`http://localhost:9000${nsEndpoint}`)

            nsSocket.on('nsRoomLoad', (nsRooms)=>{
                // console.log(nsRooms);
                const roomList = document.querySelector('.room-list')
                roomList.innerHTML = "";
                nsRooms.forEach((rooms)=>{
                    var glyph;
                    if(rooms.privateRoom){
                        glyph = 'lock'
                    }else{
                        glyph = 'globe'
                    }
                    roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${rooms.roomTitle}</li>`;
                })
            })
        });
    });
});

