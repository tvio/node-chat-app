"use strict";

const path = require('path');
const http = require('http');
const express = require ('express');
const socketIO = require('socket.io');

var {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validations');
const Users = require('./utils/users');

const publicPath = path.join(__dirname,'../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


var users = new Users();


const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
//testovani branch
var testStat = path.join(__dirname + '../../playground');
app.use(express.static(testStat));


app.get('/',(req,res)=>res.send('Ahojky'));


io.on('connection',(socket)=>{
    console.log('New User connected');

    //socket.emit from admin
    //socket.broadcast.emit from admin ostatnim  - tenhle uzivatel se prihlasil
   

    socket.on('join', (params, callback) =>{
        
        if (!isRealString(params.name) || !isRealString(params.room) ){
          return  callback('Name and room are required.');
        }
        //hledam stejneho uzika
        var locuser = users.getUserN(params.name);            
        if (locuser){
            return callback('Uživatelské jméno je již použito')
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);

        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        //console.log(users.getUserList(params.room));
        socket.emit('newMessage',generateMessage('admin','Hoj, vítej zde'));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('admin',`Připojil se ${params.name}`));
        callback();
    });
   
     socket.on('createMessage',(message,callback)=>{
        var user  = users.getUser(socket.id);
        
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage',generateMessage(user.name, message.text));
        }
        
        callback();
     
    });

    socket.on('createLocationMessage',(coords)=>{
        var user  = users.getUser(socket.id);
        if (user ) {  
        io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
       // console.log('createLocationMessage',generateLocationMessage('admin',coords.latitude,coords.longitude));
        }
    });

    socket.on('disconnect',()=>{
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('admin',`${user.name} has left`));
        }
    });
    
    socket.on('getRooms',()=>{
     var rooms = users.getRooms();
        if (rooms) {
            socket.emit('returnRooms' , rooms);
            console.log('pokoje>>' + rooms);
        }
        
    });

});


//server.listen(port,()=>console.log(`Chat app bezi na portu ${port}`));
server.listen(port,()=>console.log(`Chat app bezi na portu ${port}`));


// console.log(__dirname+ '/../public');
// console.log(publicPath);