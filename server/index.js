const express = require('express');
const socketio = require('socket.io');
const http = require('http');

//  @ Importing all the helper function from users Module

const { addUser, removeUser, getUser, getUsersInRoom } = require ('./users.js');

//@ Configuring os for network interfce .
var os = require('os');
var ifaces = os.networkInterfaces();
//@ Configuring os for network interfce 

const PORT = process.env.PORT || 5000;

// @ Importing Middlewares 
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// @ Implementing socket io .
io.on('connection', (socket) => {
 socket.on('join', ({name,room},callback) => {
 const { error, user } = addUser({id :socket.id, name, room});
        
  if (error) return callback (error);
      
   socket.emit('message',{user: 'admin', text: `${user.name}, Welcome to room ${user.room}` });

   socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined`});

   socket.join(user.room);

   io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
   callback();
});
   socket.on('sendMessage', (message,callback)=>{   
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message});

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    
    callback();

   });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
            if (user){
                 io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.`})
            }
    });
});

// @ Using the Middlewares
app.use(router);
server.listen(PORT, () => {
serverUrl();
})

  //  @ Function generate local ip address 
 const serverUrl = () => {
        Object.keys(ifaces).forEach((ifname) => {
            var alias = 0;
            ifaces[ifname].forEach((iface) => {
                if ('IPv4' !== iface.family || iface.internal !== false) {
                    return;
                }   
                if (alias >= 1) {   
                } else {
                    var url = 'http://' + iface.address + ':' + PORT + '/'
                    console.log(url);
                }
                ++alias;
            });
        });
    }


     //  Will Ressue the next from 1.1 hr 
