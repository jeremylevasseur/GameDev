/* 


  This file contains JavaScript for the home.html file 


*/


// GLOBAL VARIABLES
const url = window.location.origin;
var basePicturePath = "/img/";

// This function runs when the page loads
jQuery(document).ready(function ($) {
  var userJWT = localStorage.getItem("userJWT");
  var username = localStorage.getItem("username");

  $('#home-button').click(function() {
    if (userJWT != null || username != null) {
      window.location.replace("/html/dashboard.html");
    } else {
      window.location.replace("/html/authenticate.html");
    }
  });
});

