module.exports = (io) => {

    // ? EMITIR LA UBICACIÓN DEL CONDUCTOR 
    const tripDriverNamespace = io.of('/trip/driver');     
    tripDriverNamespace.on('connection', (socket) => {

        console.log('USUARIO CONECTADO');
        socket.on('position', function(data) {
            console.log(`DATA DE LA UBICACION -> ${JSON.stringify(data )}`);
            tripDriverNamespace.emit(`position/${data.id_trip}`, { lat: data.lat, lng: data.lng });
        });

        socket.on('disconnect', function(data) {
            console.log('USUARIO DESCONECTADO');
        });
    });
    
}