/* 


  This file contains JavaScript for the home.html file 


*/

// GLOBAL VARIABLES
const url = window.location.origin;
let socket = io.connect(url);
var basePicturePath = "/img/";

// This function runs when the page loads
jQuery(document).ready(function ($) {
  // Check for JWT and username
  var userJWT = localStorage.getItem("userJWT");
  var username = localStorage.getItem("username");
  if ( (userJWT === null) || (username === null) ) {
    window.location.replace("/html/authenticate.html");
  }

  $("#create-game-button").click(function () {
    var generatedGameId = makeGameId();
    localStorage.setItem("gameId", generatedGameId);

    var createRoomData = {
      gameId: generatedGameId,
      username: username
    };

    socket.emit(
      "createRoom", createRoomData,
      function (message) {
        console.log(message);
      }
    );
    
    window.location.replace("/html/lobby.html");
  });

  $("#join-game").click(function () {
    var enteredGameId = $("#game-id").val();
    if (enteredGameId.length < 5) {
      $('#game-id').css("box-shadow", "0px 0px 6px red");
    } else {
      localStorage.setItem("gameId", enteredGameId);
      window.location.replace("/html/lobby.html");
    }

  });

  $("#cancel-join-game").click(function () {
    $(".button-wrap").css("visibility", "visible");
    $(".join-game-content").css("visibility", "hidden");
  });
});

function makeGameId() {
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 6; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}
