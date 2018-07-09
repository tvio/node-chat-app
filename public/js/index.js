var socket =  io();



socket.on('getRooms', function (rooms){
    var ol = jQuery('<ol></ol>');

    rooms.forEach( function(room){
        ol.append(jQuery('<li></li>').text(room));
    });
    jQuery('#rooms').html(ol);
});

socket.on('disconnect', function (){
    console.log('Disconnected from server');
});
