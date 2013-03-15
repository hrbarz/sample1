var express = require('express');
var app 	= express();
var server 	= require('http').createServer(app);
var io		= require('socket.io').listen(server);

var mongojs = require('mongojs');

var db 		= mongojs('sample1', ['tasklist']);


server.listen(3000);


io.of('/tasklist')
	.on('connection', function (socket) {

		console.log('mio iniciado');


		socket.on('get_list',function(data){

			var list_result = [];

	  		db.tasklist.find().forEach(function(err, doc) {
			    
			    if (!doc) {
		
		 			socket.emit('list_result',list_result);        

			    	return;
			    }

	 			list_result.push(doc);

			    // doc is a document in the collection
			});

		});
  
 });


