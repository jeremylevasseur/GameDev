/* 


  This file contains JavaScript for the home.html file 


*/


// GLOBAL VARIABLES
const url = window.location.origin;
var basePicturePath = "/img/";

// This function runs when the page loads
jQuery(document).ready(function ($) {
    console.log("Home");

    $('#home-button').click(function() {
      window.location.replace("/html/authenticate.html");
    });
});

