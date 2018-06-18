
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

var li = jQuery('<li></li>');
        li.text(`${message.from}: ${message.text}`);

        jQuery('#messages').append(li);

});

// socket.emit('createMessage',{
//     from: 'Tom',
//     text: 'puf'
// }, function (data) {
//     console.log(data);
// });

socket.on('newLocationMessage',function(message){
   
    var li = jQuery('<li></li>');
   // var  a = jQuery('<a href="www.google.com">Moje aktuální lokace</a>');
    var a = jQuery('<a target="_blank">Moje aktuální lokace</a>');
    li.text(`${message.from}: `);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);
   
});

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage',{
        from: 'User',
        text: messageTextBox.val()
    }, function(){
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
    
    if (!navigator.geolocation){
        return alert('Geolokace neni podporována Vasim prohlizecem');
    }

    locationButton.attr('disabled','disabled').text('Načítám souřadnice...');
    
    navigator.geolocation.getCurrentPosition(function(position){
       locationButton.removeAttr('disabled').text('Lokace odeslána');
        socket.emit('createLocationMessage',{
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
       })


    }, function(){
        locationButton.removeAttr('disabled').text('Lokace odeslána');;
        alert('Nelze načíst Vaší lokaci');
    });
});


