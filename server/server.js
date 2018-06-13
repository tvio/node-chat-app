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

    //socket.emit from admin
    //socket.broadcast.emit from admin ostatnim  - tenhle uzivatel se prihlasil
    socket.emit('newMessage',{
        from: 'admin',
        text: 'Vítej v chatovací appce'
    });

    socket.broadcast.emit('newMessage',{
        from:'admin',
        text: 'Nový uživatel se připojil',
        pripojilSev: new Date().getTime()
    });


   
     socket.on('createMessage',(message)=>{
        console.log('createMessage',message);
        io.emit('newMessage',{
            from: message.from,
            text: message.text,
            vytvoreno: new Date().getTime()
        });
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