const path = require('path');
const http = require('http');
const express = require ('express');

const socketIO = require('socket.io');
const publicPath = path.join(__dirname,'../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));


app.get('/',(req,res)=>res.send('Ahojky'));


io.on('connection',(socket)=>{
    console.log('New User connected');

    socket.on('disconnect',()=>{
        console.log('User was disconnected');
    });
    
});


server.listen(port,()=>console.log(`Chat app bezi na portu ${port}`));



// console.log(__dirname+ '/../public');
// console.log(publicPath);