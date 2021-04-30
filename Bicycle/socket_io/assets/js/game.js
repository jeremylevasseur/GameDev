/* 

  This file contains JavaScript for the index.html file 

*/

// CONSTANTS
const url = window.location.origin;
let socket = io.connect(url);
var basePicturePath = "/img/";
var gameId = null;
var isHost = false;
var game = null;

var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1000,
  height: 600,
  backgroundColor: '#1E1E1E',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 150 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  } 
};

jQuery(document).ready(function ($) {

  var userJWT = localStorage.getItem("userJWT");
  var username = localStorage.getItem("username");
  if (userJWT === null || username === null) {
    window.location.replace("/html/authenticate.html");
  }

  gameId = localStorage.getItem("gameId");
  if (gameId === null) {
    // Go back to the dashboard
    window.location.replace("/html/dashboard.html");
  } else {
    // Try and join the game
    var joinGameData = {
      gameId: gameId,
      username: username,
    };
    socket.emit("joinGame", joinGameData, function (gameData) {
      if (gameData["status"] === "Game does not exist.") {
        window.location.replace("/html/dashboard.html");
      } else {
        game = gameData;
        if (game["host"] === username) {
          isHost = true;
        }
        console.log(gameData);
      }
    });
  }

  updateMemberList();

  setInterval(function () {
    updateMemberList();
  }, 3000);

});

function updateMemberList() {
  socket.emit("getGameMembers", gameId, function (listOfMembers) {
    // Updating member count value
    $(".member-count-value").text(listOfMembers.length);

    // Updating member list
    $(".player-list-wrap .player-list li").remove();
    $.each(listOfMembers, function (index, username) {
      $(".player-list-wrap .player-list").append(
        '<li><h3 class="name">' + username + "</h3></li>"
      );
    });
  });
}

var phaserGame = new Phaser.Game(config);

function preload() {
  
}

function create() {
  
}

function update() {
  
}