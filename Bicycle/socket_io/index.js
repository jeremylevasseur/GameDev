var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const uuid = require('uuid/v1');
var cardFunctions = require('./server_side_utils/cards');

/*
  This sets the ./assets/ directory as a static directory
  that can be accessed through HTTP. The HTML, CSS, JavaScript,
  and images can be accessed through here.
*/
app.use(express.static("assets"));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/assets/html/home.html');
});

app.get('/dashboard', function (req, res) {
  res.sendFile(__dirname + '/assets/html/dashboard.html');
});

app.get('/authenticate', function (req, res) {
  res.sendFile(__dirname + '/assets/html/authenticate.html');
});

app.get('/lobby', function (req, res) {
  res.sendFile(__dirname + '/assets/html/lobby.html');
});

app.get('/game', function (req, res) {
  res.sendFile(__dirname + '/assets/html/game.html');
});

/**
 * Instance Variables
 */
 const rooms = {};


 /**
  * Will connect a socket to a specified room
  * @param socket A connected socket.io socket
  * @param room An object that represents a room from the `rooms` instance variable object
  */
 const joinRoom = (socket, room) => {
   room.sockets.push(socket);
   socket.join(room.id, () => {
     // store the room id in the socket for future use
     socket.roomId = room.id;
     console.log(socket.id, "Joined", room.id);
   });
 };
 
 /**
  * Will make the socket leave any rooms that it is a part of
  * @param socket A connected socket.io socket
  */
 const leaveRooms = (socket) => {
   const roomsToDelete = [];
   for (const id in rooms) {
     const room = rooms[id];
     // check to see if the socket is in the current room
     if (room.sockets.includes(socket)) {
       socket.leave(id);
       // remove the socket from the room object
       room.sockets = room.sockets.filter((item) => item !== socket);
     }
     // Prepare to delete any rooms that are now empty
     if (room.sockets.length == 0) {
       roomsToDelete.push(room);
     }
   }
 
   // Delete all the empty rooms that we found earlier
   for (const room of roomsToDelete) {
     delete rooms[room.id];
   }
 };

io.on('connection', function (socket) {

  // give each socket a random identifier so that we can determine who is who when
  // we're sending messages back and forth!
  socket.id = uuid();
  console.log('A user has connected.');

  /**
   * Lets us know that players have joined a room and are waiting in the waiting room.
   */
  socket.on('ready', () => {
    console.log(socket.id, "is ready!");
    const room = rooms[socket.roomId];
    // when we have two players... START THE GAME!
    if (room.sockets.length == 2) {
      // tell each player to start the game.
      for (const client of room.sockets) {
        client.emit('initGame');
      }
    }
  });
  /**
   * Gets fired when someone wants to get the list of rooms. respond with the list of room names.
   */
   socket.on('getRoomNames', (data, callback) => {
    const roomNames = [];
    for (const id in rooms) {
      const {name} = rooms[id];
      const room = {name, id};
      roomNames.push(room);
    }

    callback(roomNames);
  });

  /**
   * Gets fired when a user wants to create a new room.
   */
  socket.on('createRoom', (roomName, callback) => {
    const room = {
      id: uuid(), // generate a unique id for the new room, that way we don't need to deal with duplicates.
      name: roomName,
      sockets: []
    };
    rooms[room.id] = room;
    // have the socket join the room they've just created.
    joinRoom(socket, room);
    callback();
  });

  /**
   * Gets fired when a player has joined a room.
   */
  socket.on('joinRoom', (roomId, callback) => {
    const room = rooms[roomId];
    joinRoom(socket, room);
    callback();
  });

  /**
   * Gets fired when a player leaves a room.
   */
  socket.on('leaveRoom', () => {
    leaveRooms(socket);
  });

  /**
   * Gets fired when a player disconnects from the server.
   */
  socket.on('disconnect', () => {
    console.log('A user has disconnected.');
    leaveRooms(socket);
  });

});

server.listen(8084, function () {
  console.log(`Listening on ${server.address().port}`);
});
