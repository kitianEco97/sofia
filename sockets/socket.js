const { io } = require('../index');

// Mensajes de Sockets
const tripDriverNameSpace = io.of('/trip/driver');

tripDriverNameSpace.on('connection', socket => {
    console.log('conectado al socket: /trip/driver');


    socket.on('position', (data) => {

        console.log('CLIENTE EMITIO: ', data);
        tripDriverNameSpace.emit(`position/${data.id_trip}`, { id_trip: data.id_trip, lat: data.lat, lng: data.lng  });

    });
   
    socket.on('disconnect', (data) => {
        console.log('UN USUARIO SE DESCONECTO DE SOCKET IO');
    });


});
