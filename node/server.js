var express = require('express');
var app 	= express();
var server 	= require('http').createServer(app);
var io		= require('socket.io').listen(server);

server.listen(3000);


io.of('/mio')
	.on('connection', function (socket) {

		console.log('mio iniciado');

  		socket.emit('a message',{
  			that: 'only',
  			'/chat': 'will get'
  		})

  
 });


