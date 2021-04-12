import React, { Component } from 'react';
import './css/user_data.css'
import { withRouter } from 'react-router-dom';

const getJWTURL = "https://www.nautilusdevelopment.ca/api/itad/v1/session_token_to_jwt"
var userDataURL = "https://www.nautilusdevelopment.ca/api/itad/v1/get_my_profile_data?jwt="
var combinedUserDataURL = null;
var jwt = null;
var sessionToken = null;

export class UserData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            typeOfAccount: 'Loading...',
            accountCreationDate: 'Loading...',
            userData: {
                userEmail: 'Loading...',
                username: 'Loading...',
                typeOfAccount: 'Loading...',
                userFirstName: 'Loading...',
                userLastName: 'Loading...',
                userPhoneNumber: 'Loading...',
                userFaxNumber: 'Loading...',
                accountCreationDate: 'Loading...'
            }
        };
    }

    fetchUserData() {
        var self = this;
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
                    combinedUserDataURL = userDataURL + jwt;
                }
            } catch (error) {
                console.log(error);
            }
            
        }).then(function() {
            fetch(combinedUserDataURL).then(function(response) {
                return response.json();
            }).then(function(data) {
                
                try {
                    if (data['error'] === "Authentication failed. Please try a different JSON Web Token.") {
                        localStorage.setItem('user_session_token', null);
                        self.props.history.push({
                            pathname: '/itad/authentication'
                        })
                    } else {

                        var userEmailVal = data[0]['user_email'];
                        var usernameVal = data[0]['username'];
                        var typeOfAccountVal = data[0]['type_of_account'];
                        var userFirstNameVal = data[0]['user_first_name'];
                        var userLastNameVal = data[0]['user_last_name'];
                        var userPhoneNumberVal = data[0]['user_phone_number'];
                        var userFaxNumberVal = data[0]['user_fax_number'];
                        var accountCreationDateVal = data[0]['account_creation_date'].replace('T', ' ').replace('.000Z', '');

                        if (typeOfAccountVal == 1) {
                            typeOfAccountVal = "Health Practitioner";
                        }

                        if (userFirstNameVal == null || userFirstNameVal == '') {
                            userFirstNameVal = "Unknown";
                        }
                        if (userLastNameVal == null || userLastNameVal == '') {
                            userLastNameVal = "Unknown";
                        }
                        if (userPhoneNumberVal == null || userPhoneNumberVal == '') {
                            userPhoneNumberVal = "Unknown";
                        }
                        if (userFaxNumberVal == null || userFaxNumberVal == '') {
                            userFaxNumberVal = "Unknown";
                        }

                        self.setState({
                            typeOfAccount: typeOfAccountVal,
                            accountCreationDate: accountCreationDateVal
                        });

                        self.props.userData['userEmail'] = userEmailVal;
                        self.props.userData['username'] = usernameVal;
                        self.props.userData['userFirstName'] = userFirstNameVal;
                        self.props.userData['userLastName'] = userLastNameVal;
                        self.props.userData['userPhoneNumber'] = userPhoneNumberVal;
                        self.props.userData['userFaxNumber'] = userFaxNumberVal;

                        self.setState({userData: self.props.userData});
                        
                    }
                } catch (error) {
                    console.log(error);
                }
                
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    componentDidMount() {
        // Resetting url
        combinedUserDataURL = null;
        // Looking for session token
        sessionToken = localStorage.getItem('user_session_token');
        if (sessionToken == null) {
            // Go back to authentication component
            this.props.history.push({
                pathname: '/itad/authentication'
            });
        } else {
            // Get user data
            this.fetchUserData();
        }
        
    }

    handleEditProfileData = e => {

        // Change state value
        this.props.changeState(this.props.editProfilePageVisibility);
        
    }

    render() {
        return (
        <div className="userData">

            <div className="userDataTitle">
                <h1>Account Information</h1>
                <hr id="userDataTitleUnderline"></hr>
            </div>

            <div className="userDataRow">
                <table id="userDataTable" align="center">
                    <tr>
                        <td className="dataTitle" id="emailTitle">Email:</td>
                        <td id="userDataSpacer"></td>
                        <td className="dataValue" id="emailValue">{this.state.userData['userEmail']}</td>
                    </tr>
                    <tr>
                        <td className="dataTitle" id="usernameTitle">Username:</td>
                        <td id="userDataSpacer"></td>
                        <td className="dataValue" id="usernameValue">{this.state.userData['username']}</td>
                    </tr>
                    <tr>
                        <td className="dataTitle" id="typeOfAccountTitle">Type Of Account:</td>
                        <td id="userDataSpacer"></td>
                        <td className="dataValue" id="typeOfAccountValue">{this.state.typeOfAccount}</td>
                    </tr>
                    <tr>
                        <td className="dataTitle" id="userFirstNameTitle">User First Name:</td>
                        <td id="userDataSpacer"></td>
                        <td className="dataValue" id="userFirstNameValue">{this.state.userData['userFirstName']}</td>
                    </tr>
                    <tr>
                        <td className="dataTitle" id="userLastNameTitle">User Last Name:</td>
                        <td id="userDataSpacer"></td>
                        <td className="dataValue" id="userLastNameValue">{this.state.userData['userLastName']}</td>
                    </tr>
                    <tr>
                        <td className="dataTitle" id="userPhoneNumberTitle">Phone Number:</td>
                        <td id="userDataSpacer"></td>
                        <td className="dataValue" id="userPhoneNumberValue">{this.state.userData['userPhoneNumber']}</td>
                    </tr>
                    <tr>
                        <td className="dataTitle" id="userFaxNumberTitle">Fax Number:</td>
                        <td id="userDataSpacer"></td>
                        <td className="dataValue" id="userFaxNumberValue">{this.state.userData['userFaxNumber']}</td>
                    </tr>
                    <tr>
                        <td className="dataTitle" id="accountCreationDateTitle">Account Creation Date:</td>
                        <td id="userDataSpacer"></td>
                        <td className="dataValue" id="accountCreationDateValue">{this.state.accountCreationDate}</td>
                    </tr>
                </table>
            </div>

            <div className="userDataRow">

                <button id="editProfileDataButton" onClick={this.handleEditProfileData}>
                    Update Account Information
                </button>

            </div>
            

        </div>
        );
    }
}

export default withRouter(UserData);
