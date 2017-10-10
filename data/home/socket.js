var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname));

server.listen(8890, function(){
    console.log('Listening at port 8890');
});

io.sockets.on('connection', function (socket) {
    console.log('cliente Conectado');
    // socket.emit('chat:updatelista', 'update'); 

	socket.on('chat:join', function(data) {


		// var aVals = new Array(data);
		console.log(data);
		// if (data!=null) {
		for (var i = 0; i < data.length; i++) {
		// // store the username in the socket session for this client
		socket.username = data.id_sesion;
		// // store the room name in the socket session for this client
		// console.log(data.id_chat);
		// console.log(data[i].id);
		 socket.room = data[i].id;
		 socket.join(data[i].id);
		// console.log(' conectado con '+data[i]['para']);
		}
		// }
	});

	socket.on('chat:jointo', function(data) {

		// store the username in the socket session for this client
		// console.log(data.id_sesion);
		// socket.username = data.id_sesion;
		// store the room name in the socket session for this client
		socket.room = data.id_chat;
		socket.join(data.id_chat);
		// console.log(' conectado con '+data.para);
	});

	socket.on('chat:updateRooms', function(){
		socket.broadcast.emit('chat:updateRooms');
	});

	socket.on('chat:salir', function(data) {

		// socket.room = data.chat_id;
		console.log('salir de la sala' + socket.room);
		// socket.broadcast.to(socket.room).emit('chat:updatelista', data);
		// socket.leave(socket.room);
	});

	socket.on('chat:sendMensaje', function(data) {
		console.log(socket.room);
		// socket.broadcast.to(socket.room).emit('chat:update', data);
		// socket.broadcast.emit('chat:updatelista', data);
		socket.broadcast.to(socket.room).emit('chat:updatelista', data);
		console.log('Mensaje'+data.texto);
	});

});