const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

// DB Config
require('./database/config').dbConnection();



// Lectura y parseo del Body
app.use( express.json() );


// Node Server
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// require('./sockets/socket');


/*
* Sockets
*/
const tripDriverSocket = require('./sockets/trip_driver');


// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );



// Mis Rutas
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/trip', require('./routes/trip') );

// LLAMAR A LOS SOCKETS
tripDriverSocket(io);

server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});