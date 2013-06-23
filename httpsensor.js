/*
var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

server.listen(3000);
*/

var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(8080);

/*
var app = require('express').createServer()
var io = require('socket.io').listen(app);

app.listen(8080);
*/


// routing
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/client.html');
});

io.sockets.on('connection', function (socket) {

    var cmd = "amixer get Master | egrep -n 'Front Left:' | egrep -o '[0-9]{1,3}%' | egrep -o '[0-9]{1,2}'";
    setInterval(function() {
	var child = exec(cmd, function (error, stdout, stderr) {
            //io.sockets.emit('updatechat', socket.username, data);
            socket.emit('cpu-temp', { 'temp': stdout });
	});     
    }, 200)

/*
    // when the client emits 'sendchat', this listens and executes
    socket.on('sendchat', function (data) {
	// we tell the client to execute 'updatechat' with 2 parameters
	io.sockets.emit('updatechat', socket.username, data);
    });

    // when the client emits 'adduser', this listens and executes
    socket.on('adduser', function(username){
	// we store the username in the socket session for this client
	socket.username = username;
	// add the client's username to the global list
	usernames[username] = username;
	// echo to client they've connected
	socket.emit('updatechat', 'SERVER', 'you have connected');
	// echo globally (all clients) that a person has connected
	socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
	// update the list of users in chat, client-side
	io.sockets.emit('updateusers', usernames);
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function(){
	// remove the username from global usernames list
	delete usernames[socket.username];
	// update list of users in chat, client-side
	io.sockets.emit('updateusers', usernames);
	// echo globally that this client has left
	socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    });
*/

});
