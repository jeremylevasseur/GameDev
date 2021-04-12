import React, { useState, useEffect } from "react";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import "./ProfilePane.css";
import EditProfileData from '../main/EditProfileData';

const ProfilePane = () => {
  const history = useHistory();

  const getJWTURL =
    "https://www.nautilusdevelopment.ca/api/itad/v1/session_token_to_jwt";
  var userDataURL =
    "https://www.nautilusdevelopment.ca/api/itad/v1/get_my_profile_data?jwt=";
  var combinedUserDataURL = null;
  var jwt = null;
  var sessionToken = null;

  const [userEmail, setUserEmail] = useState("Loading...");
  const [username, setUsername] = useState("Loading...");
  const [userFirstName, setUserFirstName] = useState("Loading...");
  const [userLastName, setUserLastName] = useState("Loading...");
  const [userPhoneNumber, setUserPhoneNumber] = useState("Loading...");
  const [userFaxNumber, setUserFaxNumber] = useState("Loading...");
  const [typeOfAccount, setTypeOfAccount] = useState("Loading...");
  const [accountCreationDate, setAccountCreationDate] = useState("Loading...");
  
  const [userData, changeUserData] = useState({
    userEmail: 'Loading...',
    username: 'Loading...',
    typeOfAccount: 'Loading...',
    userFirstName: 'Loading...',
    userLastName: 'Loading...',
    userPhoneNumber: 'Loading...',
    userFaxNumber: 'Loading...',
    accountCreationDate: 'Loading...'
  });

  const [editProfileVisibility, toggleEditProfileVisibility] = useState(false);

  const changeEditProfileVisibility = () => {
    toggleEditProfileVisibility(!editProfileVisibility);
  }

  useEffect(() => {
    // Function that runs when page loads
    // Need to look for the session token
    // Resetting url
    combinedUserDataURL = null;
    // Looking for session token
    sessionToken = localStorage.getItem("user_session_token");
    if (sessionToken == null) {
      // Go back to authentication component
      history.push("/itad/authentication");
    } else {
      // Get user data
      retrieveUserData();
    }
  }, []);

  const retrieveUserData = () => {
    console.log(getJWTURL);
    const res = fetch(getJWTURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionToken: sessionToken,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        try {
          if (data["error"] === "User must authenticate themselves again.") {
            localStorage.setItem("user_session_token", null);
            history.push("/itad/authentication");
          } else {
            // A JWT has been returned
            jwt = data["jwt"];
            combinedUserDataURL = userDataURL + jwt;
          }
        } catch (error) {
          console.log(error);
        }
      })
      .then(function () {
        console.log(combinedUserDataURL);
        fetch(combinedUserDataURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            try {
              if (data["error"] === "Authentication failed. Please try a different JSON Web Token.") {
                localStorage.setItem("user_session_token", null);
                history.push("/itad/authentication");
              } else {
                var userEmailVal = data[0]["user_email"];
                var usernameVal = data[0]["username"];
                var typeOfAccountVal = data[0]["type_of_account"];
                var userFirstNameVal = data[0]["user_first_name"];
                var userLastNameVal = data[0]["user_last_name"];
                var userPhoneNumberVal = data[0]["user_phone_number"];
                var userFaxNumberVal = data[0]["user_fax_number"];
                var accountCreationDateVal = data[0]["account_creation_date"].replace("T", " ").replace(".000Z", "");

                if (typeOfAccountVal == 1) {
                  typeOfAccountVal = "Health Practitioner";
                }

                if (userFirstNameVal == null || userFirstNameVal == "") {
                  userFirstNameVal = "Unknown";
                }

                if (userLastNameVal == null || userLastNameVal == "") {
                  userLastNameVal = "Unknown";
                }

                if (userPhoneNumberVal == null || userPhoneNumberVal == "") {
                  userPhoneNumberVal = "Unknown";
                }

                if (userFaxNumberVal == null || userFaxNumberVal == "") {
                  userFaxNumberVal = "Unknown";
                }

                setUserEmail(userEmailVal);
                setUsername(usernameVal);
                setUserFirstName(userFirstNameVal);
                setUserLastName(userLastNameVal);
                setUserPhoneNumber(userPhoneNumberVal);
                setUserFaxNumber(userFaxNumberVal);
                setTypeOfAccount(typeOfAccountVal);
                setAccountCreationDate(accountCreationDateVal);

                changeUserData({
                  userEmail: userEmailVal,
                  username: usernameVal,
                  typeOfAccount: typeOfAccountVal,
                  userFirstName: userFirstNameVal,
                  userLastName: userLastNameVal,
                  userPhoneNumber: userPhoneNumberVal,
                  userFaxNumber: userFaxNumberVal,
                  accountCreationDate: accountCreationDateVal
                });

              }
            } catch (error) {
              console.log(error);
            }
          });
      });
  };

  const refreshUserData = (passedJwt) => {
    console.log(passedJwt);
    combinedUserDataURL = userDataURL + passedJwt;
    fetch(combinedUserDataURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        try {
          if (data["error"] === "Authentication failed. Please try a different JSON Web Token.") {
            localStorage.setItem("user_session_token", null);
            history.push("/itad/authentication");
          } else {
            var userEmailVal = data[0]["user_email"];
            var usernameVal = data[0]["username"];
            var typeOfAccountVal = data[0]["type_of_account"];
            var userFirstNameVal = data[0]["user_first_name"];
            var userLastNameVal = data[0]["user_last_name"];
            var userPhoneNumberVal = data[0]["user_phone_number"];
            var userFaxNumberVal = data[0]["user_fax_number"];
            var accountCreationDateVal = data[0]["account_creation_date"].replace("T", " ").replace(".000Z", "");

            if (typeOfAccountVal == 1) {
              typeOfAccountVal = "Health Practitioner";
            }

            if (userFirstNameVal == null || userFirstNameVal == "") {
              userFirstNameVal = "Unknown";
            }

            if (userLastNameVal == null || userLastNameVal == "") {
              userLastNameVal = "Unknown";
            }

            if (userPhoneNumberVal == null || userPhoneNumberVal == "") {
              userPhoneNumberVal = "Unknown";
            }

            if (userFaxNumberVal == null || userFaxNumberVal == "") {
              userFaxNumberVal = "Unknown";
            }

            setUserEmail(userEmailVal);
            setUsername(usernameVal);
            setUserFirstName(userFirstNameVal);
            setUserLastName(userLastNameVal);
            setUserPhoneNumber(userPhoneNumberVal);
            setUserFaxNumber(userFaxNumberVal);
            setTypeOfAccount(typeOfAccountVal);
            setAccountCreationDate(accountCreationDateVal);

            changeUserData({
              userEmail: userEmailVal,
              username: usernameVal,
              typeOfAccount: typeOfAccountVal,
              userFirstName: userFirstNameVal,
              userLastName: userLastNameVal,
              userPhoneNumber: userPhoneNumberVal,
              userFaxNumber: userFaxNumberVal,
              accountCreationDate: accountCreationDateVal
            });

          }
        } catch (error) {
          console.log(error);
        }
    });
  };

  return (
    <>
      <div className="form-container">
        <div className="form-content-left">
          <h1 className="profile-title">Profile Data</h1>
        </div>
        <div className="form-content-right">
          <form className="form" noValidate>
            <div className="form-inputs">
              <label className="form-label">Email</label>
              <h6 className="form-value">{userEmail}</h6>
            </div>
            <div className="form-inputs">
              <label className="form-label">Username</label>
              <h6 className="form-value">{username}</h6>
            </div>
            <div className="form-inputs">
              <label className="form-label">First Name</label>
              <h6 className="form-value">{userFirstName}</h6>
            </div>
            <div className="form-inputs">
              <label className="form-label">Last Name</label>
              <h6 className="form-value">{userLastName}</h6>
            </div>
            <div className="form-inputs">
              <label className="form-label">Phone Number</label>
              <h6 className="form-value">{userPhoneNumber}</h6>
            </div>
            <div className="form-inputs">
              <label className="form-label">Fax Number</label>
              <h6 className="form-value">{userFaxNumber}</h6>
            </div>
            <div className="form-inputs">
              <label className="form-label">Type Of Account</label>
              <h6 className="form-value">{typeOfAccount}</h6>
            </div>
            <div className="form-inputs">
              <label className="form-label">Account Creation Date</label>
              <h6 className="form-value">{accountCreationDate}</h6>
            </div>
          </form>
        </div>
        <div className="edit-profile-container" onClick={changeEditProfileVisibility}>
          <div className="edit-profile-wrapper">
            <h6 className="edit-profile-title">Edit Profile</h6>
          </div>
        </div>
      </div>
      {editProfileVisibility && 
        <EditProfileData refreshUserData={refreshUserData} changeState={changeEditProfileVisibility} editProfilePageVisibility={editProfileVisibility} userData={userData} />
      }
    </>
  );
};

export default ProfilePane;
