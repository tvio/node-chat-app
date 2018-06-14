const path = require('path');
const http = require('http');
const express = require ('express');

const socketIO = require('socket.io');
const publicPath = path.join(__dirname,'../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var {generateMessage} = require('./utils/message');

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));


app.get('/',(req,res)=>res.send('Ahojky'));


io.on('connection',(socket)=>{
    console.log('New User connected');

    //socket.emit from admin
    //socket.broadcast.emit from admin ostatnim  - tenhle uzivatel se prihlasil
    socket.emit('newMessage',generateMessage('admin','Hoj, vítej zde'));

    socket.broadcast.emit('newMessage',generateMessage('admin','Nový uživatel se připojil'));


   
     socket.on('createMessage',(message,callback)=>{
        console.log('createMessage',message);
        io.emit('newMessage',generateMessage(message.from, message.text));
        callback('server to predal dal');
        // socket.broadcast.emit('newMessage',{
        //     from: message.from,
        //     text: message.text,
        //     vytvoreno: new Date().getTime()
        // });
    });

    socket.on('disconnect',()=>{
        console.log('User was disconnected');
    });
    
});


server.listen(port,()=>console.log(`Chat app bezi na portu ${port}`));



// console.log(__dirname+ '/../public');
// console.log(publicPath);