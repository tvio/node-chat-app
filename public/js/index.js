
var socket =  io();
// arrow funkce aokrat v chrome
socket.on('connect', function(){
    console.log('connected to server');
   
});

socket.on('disconnect', function (){
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
console.log('newMessage', message);
});

