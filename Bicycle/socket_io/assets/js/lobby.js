/* 


  This file contains JavaScript for the lobby.html file 


*/


// GLOBAL VARIABLES
const url = window.location.origin;
let socket = io.connect(url);
var basePicturePath = "/img/";

// This function runs when the page loads
jQuery(document).ready(function ($) {
    console.log("Lobby")
});

