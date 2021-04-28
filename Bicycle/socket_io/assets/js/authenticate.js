/* 


  This file contains JavaScript for the authenticate.html file 


*/

// GLOBAL VARIABLES
const url = window.location.origin;
var basePicturePath = "/img/";
const loginURL =
  "https://www.nautilusdevelopment.ca/dev_api/cards/v1/authenticate";
const signupURL =
  "https://www.nautilusdevelopment.ca/dev_api/cards/v1/create_new_user";

// This function runs when the page loads
jQuery(document).ready(function ($) {

  // Checking to see if a user has a JWT stored
  var userJWT = localStorage.getItem('userJWT');
  if (userJWT != null) {
    window.location.replace("/html/dashboard.html");
  }

  $("#login-button").click(function () {
    login();
  });

  $("#signup-button").click(function () {
    signup();
  });
});

function clearAllInputs() {
  $("#login-username").val("");
  $("#login-password").val("");
  $("#signup-username").val("");
  $("#signup-password1").val("");
  $("#signup-password2").val("");
  return;
}

function login() {
  var enteredLoginUsername = $("#login-username").val();
  var enteredLoginPassword = $("#login-password").val();

  var loginCondition1 = enteredLoginUsername.length > 0;
  var loginCondition2 = enteredLoginPassword.length > 0;

  if (loginCondition1 && loginCondition2) {
    // Log in
    const res = fetch(loginURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: enteredLoginUsername,
        password: enteredLoginPassword,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        try {
          if (data["error"] === "The username or password is incorrect.") {
            console.log("The username or password is incorrect.");
            $('#login-error-message').text("The username or password is incorrect.");
          } else if (data["error"] === "There is an error within the post request.") {
            console.log("There is an error within the post request.");
            $('#login-error-message').text("There is an error within the post request.");
          } else {
            // Successfully logged in
            console.log("Logged in.");
            var userJWT = data['jwt'];
            localStorage.setItem('userJWT', userJWT);
            clearAllInputs();
            window.location.replace("/html/dashboard.html");
          }
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function signup() {
  var enteredSignupUsername = $("#signup-username").val();
  var enteredSignupPassword1 = $("#signup-password1").val();
  var enteredSignupPassword2 = $("#signup-password2").val();

  var signupCondition1 = enteredSignupUsername.length > 3;
  var signupCondition2 = enteredSignupPassword1.length > 7;
  var signupCondition3 = enteredSignupPassword1 === enteredSignupPassword2;

  if (signupCondition1) {
    if (signupCondition2) {
      if (signupCondition3) {
        // Sign up
        const res = fetch(signupURL, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: enteredSignupUsername,
            password: enteredSignupPassword1,
          }),
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            try {
              if (data["error"] === "The username is already taken.") {
                console.log("The username is already taken.");
                $('#signup-error-message').text("The username is already taken.");
              } else if (data["error"] === "There is an error within the post request.") {
                console.log("There is an error within the post request.");
                $('#signup-error-message').text("There is an error within the post request.");
              } else {
                // Successfully signed up
                console.log("Signed up.");
                var userJWT = data['jwt'];
                localStorage.setItem('userJWT', userJWT);
                clearAllInputs();
                window.location.replace("/html/dashboard.html");
              }
            } catch (error) {
              console.log(error);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("Password fields do not match.");
      }
    } else {
      console.log("Password must be greater than seven characters.");
    }
  } else {
    console.log("Username must be greater than three characters.");
  }
}
