/* 


  This file contains JavaScript for the lobby.html file 


*/


// GLOBAL VARIABLES
const url = window.location.origin;
let socket = io.connect(url);
var basePicturePath = "/img/";
var gameId = null;

// This function runs when the page loads
jQuery(document).ready(function ($) {
  gameId = localStorage.getItem('gameId');
  console.log("Game ID: " + gameId);
});

