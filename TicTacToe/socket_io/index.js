const express = require("express");
const app = express();
const http = require("http");
const server = http.Server(app).listen(8085);  // Setting the server port to 8085
const io = require("socket.io")(server);  // Setting up Socket IO
const fs = require("fs");

const clients = {};  // This object will contain all the currently connected users

/*
  This sets the ./assets/ directory as a static directory
  that can be accessed through HTTP. The HTML, CSS, JavaScript,
  and images can be accessed through here.
*/
app.use(express.static('assets'));  

app.get("/", (req, res) => {
  const stream = fs.createReadStream(__dirname + "/assets/html/page1.html");
  stream.pipe(res);
});

// When a user connects, add them to the client object
const addClient = socket => {
  console.log("New client connected", socket.id);
  clients[socket.id] = socket;
};

// When a user disconnects, remove them from the client object
const removeClient = socket => {
  console.log("Client disconnected", socket.id);
  delete clients[socket.id];
};


io.on("connection", (socket) => {

  let id = socket.id;

  addClient(socket);

  socket.on("mousemove", data => {
    data.id = id;
    socket.broadcast.emit("moving", data);
  });

  socket.on("disconnect", () => {
    removeClient(socket);
    socket.broadcast.emit("clientdisconnect", id);
  });

});

var players = {};
var unmatched;
var playAgainConfirmation = 0;

function joinGame(socket) {
  
  // Add the player to our object of players
  players[socket.id] = {
    opponent: unmatched,
    symbol: "X",
    socket: socket
  };

  /*
    If the player is unmatched, set their unmatched property to
    their socket id so that when another player joins, the else
    block will execute and pair the two.
  */
  if (!unmatched) {
    unmatched = socket.id;
  } else {
    players[socket.id].symbol = "O";
    players[unmatched].opponent = socket.id;
    unmatched = null;
  }

}

// Returns the socket of the opponent
function getOpponent(socket) {

  if (!players[socket.id].opponent) {
    return;
  }

  return players[players[socket.id].opponent].socket;
}

function getOppositeSymbol(originalSymbol) {
  if (originalSymbol === "X") {
    return "O";
  } else {
    return "X";
  }
}

io.on("connection", function(socket) {

  var socketOpponent;
  var player1LastSymbol;
  var player2LastSymbol;
  var address;
  var addressOpponent;

  joinGame(socket);

  // Once the socket has an opponent, we can begin the game
  if (getOpponent(socket)) {

    socketOpponent = getOpponent(socket);

    address = socket.handshake.address;
    addressOpponent = socketOpponent.handshake.address;

    if (address !== addressOpponent) {

      socket.emit("game.begin", {
        symbol: players[socket.id].symbol,
        yourAddress: address,
        opponentAddress: addressOpponent,
        rematch: false
      });
  
      socketOpponent.emit("game.begin", {
        symbol: players[getOpponent(socket).id].symbol,
        yourAddress: addressOpponent,
        opponentAddress: address,
        rematch: false
      });

      player1LastSymbol = players[socket.id].symbol;
      player2LastSymbol = players[getOpponent(socket).id].symbol;

    } else {

      players[socket.id] = {
        opponent: null,
        symbol: "X",
        socket: socket
      };

      unmatched = socket.id;

    }

  }

  /*
    Listens for a move to be made and emits an event to both
    players after the move is completed
  */
  socket.on("make.move", function(data) {
    // Making sure they're still connected
    if (!getOpponent(socket)) {
      return;
    }

    // Emit that move made to the two players
    socket.emit("move.made", data);
    getOpponent(socket).emit("move.made", data);

  });

  socket.on("game.finished", function(data) {
    // Making sure they're still connected
    if (!getOpponent(socket)) {
      return;
    }

    playAgainConfirmation = 0;

  });

  socket.on("kill.session", function(data) {
    // Making sure they're still connected
    if (!getOpponent(socket)) {
      return;
    }

    playAgainConfirmation = 3;

  });

  socket.on("play.again", function(data) {
    // Making sure they're still connected
    if (!getOpponent(socket)) {
      return;
    }

    socketOpponent = getOpponent(socket);

    address = socket.handshake.address;
    addressOpponent = socketOpponent.handshake.address;

    playAgainConfirmation += 1;

    if (playAgainConfirmation == 2) {

      var player1NewSymbol = getOppositeSymbol(player1LastSymbol);
      var player2NewSymbol = getOppositeSymbol(player2LastSymbol);

      if (player1NewSymbol === player2NewSymbol) {
        player1NewSymbol = "X";
        player2NewSymbol = "O";
      }

      socket.emit("game.begin", {
        symbol: player1NewSymbol,
        yourAddress: address,
        opponentAddress: addressOpponent,
        rematch: true
      });
  
      socketOpponent.emit("game.begin", {
        symbol: player2NewSymbol,
        yourAddress: addressOpponent,
        opponentAddress: address,
        rematch: true
      });

      player1LastSymbol = player1NewSymbol;
      player2LastSymbol = player2NewSymbol;

      playAgainConfirmation = 0;
    }

  });

  // Emit an event to the opponent when the player leaves
  socket.on("disconnect", function() {
    if (getOpponent(socket)) {
      getOpponent(socket).emit("opponent.left");
    }
  });
});

