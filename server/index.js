const express = require ('express');
const socketio = require('socket.io');
const http = require ('http');

const PORT = process.env.PORT || 5000;

// @ Importing Middlewares 
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// @ Implementing socket io .
io.on('connection', (socket)=>{
      console.log ("we have a new connnection ");

      socket.on('disconnect' , ()=>{
          console.log ('User had Left')
      })
});

// @ Using the Middlewares
app.use(router);

server.listen(PORT , () => {
     console.log (`Server has started on port ${PORT}`);
})
