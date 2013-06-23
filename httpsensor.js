var io = require('socket.io').listen(8080);
var sys = require('sys')
var http = require('http');
var exec = require('child_process').exec;

var app = require('express').createServer()
var io = require('socket.io').listen(app);

app.listen(8080);

io.sockets.on('connection', function (socket) {
    var cmd = "amixer get Master | egrep -n 'Front Left:' | egrep -o '[0-9]{1,3}%' | egrep -o '[0-9]{1,2}'";
    setInterval(function() {
	var child = exec(cmd, function (error, stdout, stderr) {
	    //io.sockets.emit('updatechat', socket.username, data);
	    socket.emit('cpu-temp', { 'temp': stdout });
	});	
    }, 200)
});
