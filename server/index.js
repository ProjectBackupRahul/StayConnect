const express = require('express');
const socketio = require('socket.io');
const http = require('http');

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
    console.log("we have a new connnection ");

    socket.on('disconnect', () => {
        console.log('User had Left')
    })
});

// @ Using the Middlewares
app.use(router);

server.listen(PORT, () => {
   genURL();
})

  //  @ Function generate local ip address 
  
    const genURL = () => {
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