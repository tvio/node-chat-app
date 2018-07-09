var socket =  io();

socket.on('connect', function(){
    console.log('pripojen');

    socket.emit('getRooms', function (){
        console.log('chci to');
    });

    socket.on('returnRooms', function (rooms){
    console.log('mam to zpet');
    var ol = jQuery('<ol></ol>');

    rooms.forEach( function(room){
        ol.append(jQuery('<li></li>').text(room));
    });
    jQuery('#rooms').html(ol);
    console.log(ol);

    
});
});
