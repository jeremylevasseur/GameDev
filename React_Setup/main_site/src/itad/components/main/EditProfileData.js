import React, { Component } from 'react';
import { Spring } from 'react-spring/renderprops';
import './css/edit_profile_data.css'
import { withRouter } from 'react-router-dom';

const getJWTURL = "https://www.nautilusdevelopment.ca/api/itad/v1/session_token_to_jwt"
var updateUserDataURL = "https://www.nautilusdevelopment.ca/api/itad/v1/update_user_information?jwt="
var combinedUserDataURL = null;
var jwt = null;
var sessionToken = null;

export class EditProfileData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newUserEmail: '',
            newUsername: '',
            newUserFirstName: '',
            newUserLastName: '',
            newUserPhoneNumber: '',
            newUserFaxNumber: '',
            errorMessageText: '',
            errorMessageVisibility: false
        };
    }

    componentDidMount() {

        // Resetting url
        updateUserDataURL = null;
        // Looking for session token
        sessionToken = localStorage.getItem('user_session_token');
        if (sessionToken == null) {
            // Go back to authentication component
            this.props.history.push({
                pathname: '/itad/authentication'
            });
        }

        this.setState({newUserEmail: this.props.userData['userEmail']});
        this.setState({newUsername: this.props.userData['username']});

        if (this.props.userData['userFirstName'] != 'Unknown') {
            this.setState({newUserFirstName: this.props.userData['userFirstName']});
        }

        if (this.props.userData['userLastName'] != 'Unknown') {
            this.setState({newUserLastName: this.props.userData['userLastName']});
        }

        if (this.props.userData['userPhoneNumber'] != 'Unknown') {
            this.setState({newUserPhoneNumber: this.props.userData['userPhoneNumber']});
        }

        if (this.props.userData['userFaxNumber'] != 'Unknown') {
            this.setState({newUserFaxNumber: this.props.userData['userFaxNumber']});
        }

    }

    closeEditProfileInformationDiv = e => {

        // Change state value
        this.props.changeState(this.props.editProfilePageVisibility);
        
    }

    handleNewUserEmailChange = e => {
        this.setState({newUserEmail: e.target.value});
    }

    handleNewUsernameChange = e => {
        this.setState({newUsername: e.target.value});
    }

    handleNewUserFirstNameChange = e => {
        this.setState({newUserFirstName: e.target.value});
    }

    handleNewUserLastNameChange = e => {
        this.setState({newUserLastName: e.target.value});
    }

    handleNewUserPhoneNumberChange = e => {
        this.setState({newUserPhoneNumber: e.target.value});
    }

    handleNewUserFaxNumberChange = e => {
        this.setState({newUserFaxNumber: e.target.value});
    }

    handleSubmit = e => {
        e.preventDefault();

        var self = this;
        updateUserDataURL = "https://www.nautilusdevelopment.ca/api/itad/v1/update_user_information?jwt="
        var enteredEmail = this.state.newUserEmail;
        var enteredUsername = this.state.newUsername;
        var enteredUserFirstName = this.state.newUserFirstName;
        var enteredUserLastName = this.state.newUserLastName;
        var enteredUserPhoneNumber = this.state.newUserPhoneNumber;
        var enteredUserFaxNumber = this.state.newUserFaxNumber;

        var conditionOne = enteredEmail === '';
        var conditionTwo = enteredUsername === '';
        
        if (conditionOne || conditionTwo) {
            // One or more required fields are empty
            this.setState({
                errorMessageText: "One or more required fields are empty.",
                errorMessageVisibility: true
            });
        } else {

            // Make post request
            const res = fetch(getJWTURL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionToken: sessionToken
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                
                try {
                    if (data['error'] === "User must authenticate themselves again.") {                    
                        localStorage.setItem('user_session_token', null);
                        self.props.history.push({
                            pathname: '/itad/authentication'
                        })
                    } else {
                        // A JWT has been returned
                        jwt = data['jwt'];
                        updateUserDataURL = updateUserDataURL + jwt;
                    }
                } catch (error) {
                    console.log(error);
                }
                
            }).then(function() {

                // Make post request
                const res = fetch(updateUserDataURL, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: enteredUsername,
                        userFirstName: enteredUserFirstName,
                        userLastName: enteredUserLastName,
                        userEmail: enteredEmail,
                        userPhoneNumber: enteredUserPhoneNumber,
                        userFaxNumber: enteredUserFaxNumber
                    })
                })
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {

                    try {
                        if (data['error'] === "Server error, please try again in 10 minutes.") {
                            self.setState({
                                errorMessageText: "Server error, please try again in 10 minutes.",
                                errorMessageVisibility: true
                            });
                        } else {
                            // User's data has been updated successfully
                            console.log("Success");
                            // window.location.reload(false);
                            // // Dismissing the update data view by changing the visibility state value
                            self.props.refreshUserData(jwt);
                            self.props.changeState(self.props.editProfilePageVisibility);

                        }
                    } catch (error) {
                        console.log(error);
                    }
                    
                })
                .catch((error) => {
                    console.log(error);
                });

            });

            
        }

    }

    render() {
        return (
            <div id="editProfileDataDiv">
                    
                <div id="closeEditProfileDiv" onClick={this.closeEditProfileInformationDiv}>X</div>

                <div id="editProfileDataTitle">Update Account Information</div>

                <div className="userDataRow">
                    <table id="editUserDataTable" align="center">
                        <tr>
                            <td className="editDataTitle" id="emailTitle">Email*:</td>
                            <td id="userDataSpacer"></td>
                            <td className="editDataValue" id="editEmailValue">
                                <div >
                                    <input className="editInput form-control" name="email" size="30" placeholder="New email"
                                            required onChange={this.handleNewUserEmailChange} value={this.state.newUserEmail} />

                                    <span className="focusEditInput" placeholder="New Email"></span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="editDataTitle" id="usernameTitle">Username*:</td>
                            <td id="userDataSpacer"></td>
                            <td className="editDataValue" id="editUsernameValue">
                                <input className="editInput form-control" name="username" size="30" placeholder="Username"
                                        required onChange={this.handleNewUsernameChange} value={this.state.newUsername} />

                                <span className="focusEditInput" placeholder="Username"></span>
                            </td>
                        </tr>
                        <tr>
                            <td className="editDataTitle" id="userFirstNameTitle">User First Name:</td>
                            <td id="userDataSpacer"></td>
                            <td className="editDataValue" id="editUserFirstNameValue">
                                <input className="editInput form-control" name="userfirstname" size="30" placeholder="First Name"
                                        required onChange={this.handleNewUserFirstNameChange} value={this.state.newUserFirstName} />

                                <span className="focusEditInput" placeholder="First Name"></span>
                            </td>
                        </tr>
                        <tr>
                            <td className="editDataTitle" id="userLastNameTitle">User Last Name:</td>
                            <td id="userDataSpacer"></td>
                            <td className="editDataValue" id="editUserLastNameValue">
                                <input className="editInput form-control" name="userlastname" size="30" placeholder="Last Name"
                                        required onChange={this.handleNewUserLastNameChange} value={this.state.newUserLastName} />

                                <span className="focusEditInput" placeholder="Last Name"></span>
                            </td>
                        </tr>
                        <tr>
                            <td className="editDataTitle" id="userPhoneNumberTitle">Phone Number:</td>
                            <td id="userDataSpacer"></td>
                            <td className="editDataValue" id="editUserPhoneNumberValue">
                                <input className="editInput form-control" name="userphonenumber" size="30" placeholder="Phone Number"
                                        required onChange={this.handleNewUserPhoneNumberChange} value={this.state.newUserPhoneNumber} />

                                <span className="focusEditInput" placeholder="Phone Number"></span>
                            </td>
                        </tr>
                        <tr>
                            <td className="editDataTitle" id="userFaxNumberTitle">Fax Number:</td>
                            <td id="userDataSpacer"></td>
                            <td className="editDataValue" id="editUserFaxNumberValue">
                                <input className="editInput form-control" name="userfaxnumber" size="30" placeholder="Fax Number"
                                        required onChange={this.handleNewUserFaxNumberChange} value={this.state.newUserFaxNumber} />

                                <span className="focusEditInput" placeholder="Fax Number"></span>
                            </td>
                        </tr>
                    </table>
                </div>

                <div className="editProfileInformationElement">
                    <p id="requiredText">* = Required</p>
                </div>

                <div className="editProfileInformationElement">
                    <button id="editProfileInformationButton" onClick={this.handleSubmit}>Update Information</button>
                </div>

                <div className="editProfileInformationElement">
                    <h3 className="errorMessage" style={errorMessageStyle}>{this.state.errorMessageText}</h3>
                </div>
                    
            </div>
        );
    }
}

const errorMessageStyle = {
    color: 'red',
    fontSize: '20px',
    textAlign: 'center'
}

export default withRouter(EditProfileData);
