var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
const uuid = require("uuid/v1");
var cardFunctions = require("./server_side_utils/cards");

/*
  This sets the ./assets/ directory as a static directory
  that can be accessed through HTTP. The HTML, CSS, JavaScript,
  and images can be accessed through here.
*/
app.use(express.static("assets"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/assets/html/home.html");
});

app.get("/dashboard", function (req, res) {
  res.sendFile(__dirname + "/assets/html/dashboard.html");
});

app.get("/authenticate", function (req, res) {
  res.sendFile(__dirname + "/assets/html/authenticate.html");
});

app.get("/lobby", function (req, res) {
  res.sendFile(__dirname + "/assets/html/lobby.html");
});

app.get("/game", function (req, res) {
  res.sendFile(__dirname + "/assets/html/game.html");
});

/**
 * Instance Variables
 */
const rooms = {};
const games = {};
const sockets = {};
const socketUsernames = {};
const usernameSockets = {};

// For testing purposes
// const testerRoom = {
//   id: "AAAAAA",
//   name: "AAAAAA",
//   sockets: ["tester"],
//   socketIds: ["tester"],
//   usernames: ["tester"],
//   host: "jeremylevasseur",
//   gameStarted: false,
// };
// rooms["AAAAAA"] = testerRoom;

/**
 * Will connect a socket to a specified room
 * @param socket A connected socket.io socket
 * @param room An object that represents a room from the `rooms` instance variable object
 */
const joinRoom = (socket, room, joinRoomData) => {
  room.sockets.push(socket);
  room.socketIds.push(socket.id);
  room.usernames.push(joinRoomData["username"]);
  sockets[socket.id] = socket;
  socketUsernames[socket.id] = joinRoomData["username"];
  usernameSockets[joinRoomData["username"]] = socket.id;
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
      var usernameToRemove = socketUsernames[socket.id];
      // remove the socket and username from the room object
      room.sockets = room.sockets.filter((item) => item !== socket);
      room.socketIds = room.socketIds.filter((item) => item !== socket.id);
      room.usernames = room.usernames.filter(
        (item) => item !== usernameToRemove
      );

      // remove the username and socket from dictionaries
      delete sockets[socket.id];
      delete socketUsernames[socket.id];
      delete usernameSockets[usernameToRemove];
    }
    // Prepare to delete any rooms that are now empty
    if (room.sockets.length == 0) {
      roomsToDelete.push(room);
    }
  }

  // Delete all the empty rooms that we found earlier
  //  for (const room of roomsToDelete) {
  //    delete rooms[room.id];
  //  }
};

/**
 * Will connect a socket to a specified game
 * @param socket A connected socket.io socket
 * @param game An object that represents a room from the `rooms` instance variable object
 */
const joinGame = (socket, game, joinGameData) => {
  // The user's username will already be present, must only update the sockets
  game.sockets.push(socket);
  game.socketIds.push(socket.id);
  sockets[socket.id] = socket;
  socketUsernames[socket.id] = joinGameData["username"];
  usernameSockets[joinGameData["username"]] = socket.id;
  socket.join(game.id, () => {
    // store the game id in the socket for future use
    socket.gameId = game.id;
    console.log(socket.id, "Joined", game.id);
  });
};

/**
 * Will make the socket leave any games that it is a part of
 * @param socket A connected socket.io socket
 */
const leaveGames = (socket) => {
  const gamesToDelete = [];
  for (const id in games) {
    const game = games[id];
    // check to see if the socket is in the current game
    if (game.sockets.includes(socket)) {
      socket.leave(id);
      var usernameToRemove = socketUsernames[socket.id];
      // remove the socket from the game object
      game.sockets = game.sockets.filter((item) => item !== socket);
      game.socketIds = game.socketIds.filter((item) => item !== socket.id);

      // remove the username and socket from dictionaries
      delete sockets[socket.id];
      delete socketUsernames[socket.id];
      delete usernameSockets[usernameToRemove];
    }
    // Prepare to delete any games that are now empty
    if (game.sockets.length == 0) {
      gamesToDelete.push(game);
    }
  }

  // Delete all the empty games that we found earlier
  //  for (const game of gamesToDelete) {
  //    delete games[game.id];
  //  }
};

io.on("connection", function (socket) {
  // give each socket a random identifier so that we can determine who is who when
  // we're sending messages back and forth!
  socket.id = uuid();
  console.log("A user has connected.");

  // Need to check if the user is present in a game.
  // socket.on("reloadGame", (connectionData, callback) => {
  //   console.log(connectionData['username']);
  //   console.log(connectionData['gameId']);
  //   callback({status: "Test"});
  // });

  /**
   * Returns a list of the players in the room
   */
  socket.on("getRoomMembers", (roomId, callback) => {
    const roomData = rooms[roomId];
    var listOfMembers = [];
    try {
      for (var i = 0; i < roomData["usernames"].length; i++) {
        listOfMembers.push(roomData["usernames"][i]);
      }
    } catch (error) {
      console.log("No usernames.");
    }
    callback(listOfMembers);
  });

  /**
   * Gets fired when a user wants to create a new room.
   */
  socket.on("createRoom", (createRoomData, callback) => {
    const room = {
      id: createRoomData["gameId"],
      name: createRoomData["gameId"],
      sockets: [],
      socketIds: [],
      usernames: [],
      host: createRoomData["username"],
      gameStarted: false,
    };
    rooms[room.id] = room;
    callback("OK");
  });

  /**
   * Gets fired when a player has joined a room.
   */
  socket.on("joinRoom", (joinRoomData, callback) => {
    const room = rooms[joinRoomData["gameId"]];
    // Making sure the room exists
    if (typeof room === "undefined") {
      callback({ status: "Wrong room ID." });
    } else {
      joinRoom(socket, room, joinRoomData);
      var tempRoomObject = {
        id: room["id"],
        usernames: room["usernames"],
        host: room["host"],
        gameStarted: room["gameStarted"],
      };
      callback(tempRoomObject);
    }
  });

  /**
   * Returns the data of a specific room
   */
  socket.on("getRoomData", (roomId, callback) => {
    const room = rooms[roomId];
    var tempRoomObject = {
      id: room["id"],
      usernames: room["usernames"],
      host: room["host"],
      gameStarted: room["gameStarted"],
    };
    callback(tempRoomObject);
  });

  /**
   * Gets fired when a player leaves a room.
   */
  socket.on("leaveRoom", () => {
    leaveRooms(socket);
  });

  /**
   * Returns a list of the players in the game
   */
  socket.on("getGameMembers", (gameId, callback) => {
    const gameData = games[gameId];
    var listOfMembers = [];
    try {
      for (var i = 0; i < gameData["usernames"].length; i++) {
        listOfMembers.push(gameData["usernames"][i]);
      }
    } catch (error) {
      console.log("No usernames.");
    }
    callback(listOfMembers);
  });

  /**
   * Gets fired when the host clicks the start game button.
   */
  socket.on("startGame", (gameId, callback) => {
    const room = rooms[gameId];
    var game = {
      id: gameId,
      name: gameId,
      sockets: [],
      socketIds: [],
      usernames: [],
      host: room["host"],
      gameStarted: true,
    };

    for (var i = 0; i < room["usernames"].length; i++) {
      var tempUsername = room["usernames"][i];
      game['usernames'].push(tempUsername);
    }

    // Letting all players know that the game is starting
    for (var i = 0; i < room["sockets"].length; i++) {
      var tempSocket = room["sockets"][i];
      tempSocket.emit("startingGame");
    }

    games[gameId] = game;
    callback({"status": "OK"});
  });

  /**
   * Gets fired when a player has joined a game.
   */
  socket.on("joinGame", (joinGameData, callback) => {
    const game = games[joinGameData["gameId"]];
    // Making sure the room exists
    if (typeof game === "undefined") {
      callback({ status: "Game does not exist." });
    } else {
      joinGame(socket, game, joinGameData);
      var tempGameObject = {
        id: game["id"],
        usernames: game["usernames"],
        host: game["host"],
        gameStarted: game["gameStarted"],
      };
      callback(tempGameObject);
    }
  });

  /**
   * Gets fired when a player leaves a game.
   */
  socket.on("leaveGame", () => {
    leaveGames(socket);
  });

  /**
   * Gets fired when a player disconnects from the server.
   */
  socket.on("disconnect", () => {
    console.log("A user has disconnected.");
    leaveRooms(socket);
    leaveGames(socket);
  });
});

server.listen(8084, function () {
  console.log(`Listening on ${server.address().port}`);
});
