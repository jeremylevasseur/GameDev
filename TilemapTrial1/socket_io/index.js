var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

/*
  This sets the ./assets/ directory as a static directory
  that can be accessed through HTTP. The HTML, CSS, JavaScript,
  and images can be accessed through here.
*/
app.use(express.static("assets"));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/assets/html/page1.html');
});

io.on('connection', function (socket) {
  console.log('a user connected: ', socket.id);

  // when a player disconnects, remove them from our players object
  socket.on('disconnect', function () {
    console.log('user disconnected: ', socket.id);
    // emit a message to all players to remove this player
    socket.broadcast.emit('player.disconnected', socket.id);
  });

});

server.listen(8084, function () {
  console.log(`Listening on ${server.address().port}`);
});
