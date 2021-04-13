/* 


  This file contains JavaScript for the index.html file 


*/


// GLOBAL VARIABLES
const url = window.location.origin;
let socket = io.connect(url);
var basePicturePath = "/img/";
var myTurn = true;
var symbol;
var dots;

// This function runs when the page loads
jQuery(document).ready(function ($) {
  
  // Setting on click functions for the nine separate grid items
  $("#zero-zero").click(function () {
    attemptToMakeMove("zero-zero-img");
  });

  $("#zero-one").click(function () {
    attemptToMakeMove("zero-one-img");
  });

  $("#zero-two").click(function () {
    attemptToMakeMove("zero-two-img");
  });

  $("#one-zero").click(function () {
    attemptToMakeMove("one-zero-img");
  });

  $("#one-one").click(function () {
    attemptToMakeMove("one-one-img");
  });

  $("#one-two").click(function () {
    attemptToMakeMove("one-two-img");
  });

  $("#two-zero").click(function () {
    attemptToMakeMove("two-zero-img");
  });

  $("#two-one").click(function () {
    attemptToMakeMove("two-one-img");
  });

  $("#two-two").click(function () {
    attemptToMakeMove("two-two-img");
  });


  // Setting an on click function for the play again button
  $("#play-again-button").click(function () {
    console.log("Play again button was clicked.");
  });

});


function getBoardData() {
  var boardData = {};  // Will contain an object of the current alt values of each grid value

  $(".grid-container img").each(function () {
    boardData[$(this).attr("id")] = $(this).attr("alt") || "";
  });
  /*
    It will look something like this:
    {
      'zero-zero-img': '',
      'zero-one-img': 'X',
      'zero-two-img': 'O',
      ...
      'two-two-img': 'X',
    }
  */

  return boardData;

}

function checkIfSomeoneWon() {
  var boardData = getBoardData();  // Getting board data

  matches = ["XXX", "OOO"];  // Game is over if one of these matches is made

  // Here is a list of concatenated strings of all the possible winning directions
  possibleWinningDirections = [
    boardData['zero-zero-img'] + boardData['zero-one-img'] + boardData['zero-two-img'],
    boardData['one-zero-img'] + boardData['one-one-img'] + boardData['one-two-img'],
    boardData['two-zero-img'] + boardData['two-one-img'] + boardData['two-two-img'],
    boardData['zero-zero-img'] + boardData['one-one-img'] + boardData['two-two-img'],
    boardData['zero-two-img'] + boardData['one-one-img'] + boardData['two-zero-img'],
    boardData['zero-zero-img'] + boardData['one-zero-img'] + boardData['two-zero-img'],
    boardData['zero-one-img'] + boardData['one-one-img'] + boardData['two-one-img'],
    boardData['zero-two-img'] + boardData['one-two-img'] + boardData['two-two-img']
  ];
  /*
    It will look something like this:
    ['XOX', 'XXO', 'OOX', ... , 'X']

    The game is over when one of these directions equals 'XXX' or 'OOO'
  */

  for (var i = 0; i < possibleWinningDirections.length; i++) {
    if (possibleWinningDirections[i] === matches[0] || possibleWinningDirections[i] === matches[1]) {
      // Found a match
      return true;
    }
  }

  return false;
}

function checkIfAllMovesHaveBeenPlayed() {
  var boardData = getBoardData();  // Getting board data
  var boardValues = Object.values(boardData);  // Will contain a list of the values in each grid item

  for (var i = 0; i < boardValues.length; i++) {
    if (boardValues[i] === '') {
      // Found an empty grid item, the game is not over
      return false;
    }
  }

  // Did not find an empty grid item, the game is over
  return true;
}

// Updating the turn message that is displayed on screen
function updateTurnMessages() {
  if (!myTurn) {
    $("#game-status-message").text("Your opponent's turn");
    // Decreasing grid opacity
    $('.grid-container').fadeTo("fast" , 0.5, function() {});
    // Beginning wait animation
    startWaitingAnimation();
  } else {
    $("#game-status-message").text("Your turn.");
    // Increasing grid opacity
    $('.grid-container').fadeTo("fast" , 1, function() {});
    // Stopping wait animation
    stopWaitingAnimation();
  }
}

function attemptToMakeMove(imgId) {

  // It is not the player's turn
  if (!myTurn) {
    return;
  }

  // The clicked grid item has already been chosen
  if ($('#' + imgId).attr("alt").length) {
    return;
  }

  // A move was made and now we need to send the data to the server
  socket.emit("make.move", {
    symbol: symbol,
    position: imgId
  });

}

function startWaitingAnimation() {
  $('#wait').css({visibility: 'visible'});
  dots = window.setInterval( function() {
    var wait = document.getElementById("wait");
    if ( wait.innerHTML.length > 2 ) 
        wait.innerHTML = "";
    else 
        wait.innerHTML += ".";
    }, 300);
}

function stopWaitingAnimation() {
  clearInterval(dots);
  $('#wait').css({visibility: 'hidden'});
}


// This block is run when a move is made by either player
socket.on("move.made", function(data) {

  // Setting the grid image to the symbol that was passed by the server
  $("#" + data.position).attr("src", basePicturePath + data.symbol + ".png");
  // Setting the alt property of the image to the symbol
  $("#" + data.position).attr("alt", data.symbol);

  /* 
    If the symbol recieved from the server is the same as the player's symbol, 
    that means they just made a move it is no longer their turn.
  */
  if (data.symbol === symbol) {
    myTurn = false;
  } else {
    myTurn = true;
  }

  // Checking to see if the three-in-a-line has been made
  if (checkIfSomeoneWon()) {

    // The game has been won
    // Changing message to result of the game
    if (myTurn) {
      $("#game-status-message").text("Game over. You lost.");
    } else {
      $("#game-status-message").text("Game over. You won!");
    }

    // Stopping wait animation
    stopWaitingAnimation();
    $('.grid-container').fadeTo("fast" , 1, function() {});

    // Disabling the board because the game is over
    $(".grid-container *").attr("disabled", true).off('click');

    // Make play again button visible
    $('#play-again-button').css({display: 'inline'});

  } else if(checkIfAllMovesHaveBeenPlayed()) {

    // Stopping wait animation and bringing opacity back
    stopWaitingAnimation();
    $('.grid-container').fadeTo("fast" , 1, function() {});
    
    // There are no more positions left to play so it was a draw
    $("#game-status-message").text("It's a draw!");
    
    // Disabling the board because the game is over
    $(".grid-container *").attr("disabled", true).off('click');

  } else {

    // The game is not over yet, move to the next turn
    updateTurnMessages();

  }
});

// Setting preconditions when the server gives the game.begin signal
socket.on("game.begin", function(data) {
  
  // Assigning symbol
  symbol = data.symbol;

  // Assiging image to the symbol statement
  $('#symbol-statement').attr("src", basePicturePath + data.symbol + ".png");

  // Making the apostrophe s visible
  $('#symbol-statement-plural').css({visibility: 'visible'});

  // If my symbol is X then I go first
  if (symbol === "X") {
    myTurn = true;
  } else {
    myTurn = false;
  }

  updateTurnMessages();
});

// If the opponent leaves the game, the board needs to be disabled
socket.on("opponent.left", function() {
  $("#game-status-message").text("Your opponent left the game.");
  $(".grid-container *").attr("disabled", "disabled").off('click');
});


