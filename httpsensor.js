var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

var exec = require('child_process').exec;

app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/client.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading client.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {

    var cmd = "amixer get Master | egrep -n 'Front Left:' | egrep -o '[0-9]{1,3}%' | egrep -o '[0-9]{1,2}'";
    setInterval(function() {
	var child = exec(cmd, function (error, stdout, stderr) {
            //io.sockets.emit('updatechat', socket.username, data);
            socket.emit('cpu-temp', { 'temp': stdout.trim() });
	});     
    }, 200)

});
