/* 


  This file contains JavaScript for the home.html file 


*/

// GLOBAL VARIABLES
const url = window.location.origin;
var basePicturePath = "/img/";

// This function runs when the page loads
jQuery(document).ready(function ($) {
  // Check for user JWT
  var userJWT = localStorage.getItem("userJWT");
  if (userJWT === null) {
    window.location.replace("/html/authenticate.html");
  }

  $("#create-game-button").click(function () {
    var generatedGameId = makeGameId();
    localStorage.setItem("gameId", generatedGameId);
    window.location.replace("/html/lobby.html");
  });

  $("#enter-game-id").click(function () {
    $(".button-wrap").css("visibility", "hidden");
    $(".join-game-content").css("visibility", "visible");
  });

  $("#join-game").click(function () {
    var enteredGamedId = $("#game-id").val();
    localStorage.setItem("gameId", enteredGamedId);
    window.location.replace("/html/lobby.html");
  });

  $("#cancel-join-game").click(function () {
    $(".button-wrap").css("visibility", "visible");
    $(".join-game-content").css("visibility", "hidden");
  });
});

function makeGameId() {
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 6; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}

