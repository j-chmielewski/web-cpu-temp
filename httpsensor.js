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

    var cmd = "sensors | grep Core | awk '{print $3}'| egrep -o '[0-9]{1,3}'"
    setInterval(function() {
	var child = exec(cmd, function (error, stdout, stderr) {
	    var temps = stdout.split("\n");
	    var sum = 0;
	    var n = 0;
	    for(t in temps) {
		var int = parseInt(temps[t]);
		if(int) {
		    sum += int;
		    n++;
		}
	    }
	    var avg = sum / n;
            socket.emit('cpu-temp', { 'temp': avg });
	});     
    }, 200)

});
