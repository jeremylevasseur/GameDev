/* 


  This file contains JavaScript for the lobby.html file 


*/

// GLOBAL VARIABLES
const url = window.location.origin;
let socket = io.connect(url);
var basePicturePath = "/img/";
var gameId = null;
var isHost = false;
var room = null;

// This function runs when the page loads
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
    var joinRoomData = {
      gameId: gameId,
      username: username,
    };
    socket.emit("joinRoom", joinRoomData, function (roomData) {
      if (roomData["status"] === "Wrong room ID.") {
        window.location.replace("/html/dashboard.html");
      } else {
        room = roomData;
        if (roomData["host"] === username) {
          isHost = true;
          // Make the start game button visible
          $(".start-game-button").css("display", "inline");
        }
        console.log(roomData);
      }
    });
  }

  $(".game-id-value").text(gameId);

  updateMemberList();

  setInterval(function () {
    updateMemberList();
  }, 3000);

  // Brings user back to dashboard
  $('.leave-game-button').click(function () {
    localStorage.removeItem("gameId");
    window.location.replace("/html/dashboard.html");
  });

  // Starts the game
  $('.start-game-button').click(function () {
    socket.emit("startGame", gameId, function(message) {
      console.log("Message");
    });
  });
});

function updateMemberList() {
  socket.emit("getRoomMembers", gameId, function (listOfMembers) {
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

// The game has been started by the host and the user must
// be redirected to the game page.
socket.on("startingGame", function() {
  window.location.replace("/html/game.html");
});
