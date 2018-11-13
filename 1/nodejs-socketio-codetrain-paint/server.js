var express = require('express')
var app = express()
var server = app.listen(3000);
var socket = require('socket.io');
var io = socket(server);
app.use(express.static('public'));
console.log('server on port 3000');
io.sockets.on('connection', newConnection);

function newConnection(socket){
	console.info('new socket id : ' + socket.id);
	socket.on('mouse', function(data){
		socket.broadcast.emit('mouse', data);
		console.log('server received: ' + data);
	});
}