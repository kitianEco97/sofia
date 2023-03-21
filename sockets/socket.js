const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection', (client) => {

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    //? verificar información
    if (!valido) {return client.disconnect()}

    //* cliente autenticado
    usuarioConectado(uid);
    
    // Ingresar al usuario a una sala en particular
    // sala global, client.id, 641250ab99baf9ce18fe4ac8
    client.join(uid);

    // Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async (payload) => {
        // TODO GRABAR MENSAJE
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });


     client.on('emitir-mensaje', (payload) => {
          console.log( payload );
          io.emit('nuevo-mensaje', payload); 
         client.broadcast.emit('nuevo-mensaje', payload); 
      });

      client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });
 });
