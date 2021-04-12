import React, { Component } from 'react';
import { FormWithConstraints, FieldFeedbacks, FieldFeedback } from 'react-form-with-constraints';

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            password2: '',
            groupCode: '',
            errorMessageText: ''
        }
    }

    handleEmailChange = e => {
        this.form.validateFields(e.target);
        this.setState({email: e.target.value});
    }

    handleUsernameChange = e => {
        this.form.validateFields(e.target);
        this.setState({username: e.target.value});
    }

    handlePasswordChange = e => {
        this.form.validateFields(e.target);
        this.setState({password: e.target.value});
    }

    handlePassword2Change = e => {
        this.form.validateFields(e.target);
        this.setState({password2: e.target.value});
    }

    handleGroupCodeChange = e => {
        this.form.validateFields(e.target);
        this.setState({groupCode: e.target.value});
    }

    handleSubmit = e => {
    
        e.preventDefault();

        var self = this;
        var createNewUserURL = "https://www.nautilusdevelopment.ca/api/itad/v1/create_new_user";
        var enteredEmail = this.state.email;
        var enteredUsername = this.state.username;
        var enteredPassword = this.state.password;
        var enteredPassword2 = this.state.password2;
        var enteredGroupCode = this.state.groupCode;

        // Making sure all fields have been filled in
        var conditionOne = createNewUserURL === '';
        var conditionTwo = enteredEmail === ''
        var conditionThree = enteredUsername === '';
        var conditionFour = enteredPassword === '';
        var conditionFive = enteredPassword2 === '';
        var conditionSix = enteredGroupCode === '';

        if (conditionOne || conditionTwo || conditionThree || conditionFour || conditionFive || conditionSix) {
            // One or more fields are empty
            this.setState({
                errorMessageText: "One or more fields are empty.",
                errorMessageVisibility: true
            });
        } else {
            // Check to make sure the two passwords entered are the same
            if (enteredPassword === enteredPassword2) {
                // Check to make sure password is greater than 7 characters
                if (enteredPassword.length > 7) {
                    // Make post request
                    const res = fetch(createNewUserURL, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: enteredEmail,
                            username: enteredUsername,
                            password: enteredPassword,
                            groupCode: enteredGroupCode
                        })
                    })
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(data) {

                        try {
                            if (data['error'] === "The group code is invalid.") {
                                self.setState({
                                    errorMessageText: "Invalid group code.",
                                    errorMessageVisibility: true
                                });
                            } else if (data['error'] === "The username is already taken.") {
                                self.setState({
                                    errorMessageText: "The username is already taken.",
                                    errorMessageVisibility: true
                                });
                            } else {
                                
                                self.props.executeRegisterToast();
                                self.props.changeState(self.props.isLogInActive);
                                
                            }

                        } catch (error) {
                            console.log(error);
                        }
                        
                    })
                    .catch((error) => {
                        alert(error);
                    });

                } else {
                    // Password must be longer than 7 characters
                    this.setState({
                        errorMessageText: "Your password must be longer than 7 characters.",
                        errorMessageVisibility: true
                    });
                }
            } else {
                // Passwords do not match
                this.setState({
                    errorMessageText: "The password fields do not match.",
                    errorMessageVisibility: true
                });
            }
        }
    }
    

    render() {
        return (
            <div className="register" ref={this.props.containerRef}>
                <FormWithConstraints
                    ref={form => this.form = form}
                    onSubmit={this.contactSubmit}
                    noValidate>

                    <div className="row">

                        <div className="registerElement">
                            <h4 className="registerTitle">Register</h4>
                        </div>

                        <div className="registerElement">
                            <input className="registerInput form-control" name="email" size="30" placeholder="Email"
                                    required onChange={this.handleEmailChange} value={this.state.email} autoComplete="new-password" />
                            <span className="focusRegisterInput" placeholder="Email"></span>

                            <FieldFeedbacks for="email">
                                <FieldFeedback when="*" />
                            </FieldFeedbacks>
                        </div>

                        <div className="registerElement">
                            <input className="registerInput form-control" name="username" size="30" placeholder="Username"
                                    required onChange={this.handleUsernameChange} value={this.state.username} autoComplete="new-password" />
                            <span className="focusRegisterInput" placeholder="Username"></span>

                            <FieldFeedbacks for="name">
                                <FieldFeedback when="*" />
                            </FieldFeedbacks>
                        </div>

                        <div className="registerElement">
                            <input className="registerInput form-control" type="password" name="password" size="30" placeholder="Password"
                                    required onChange={this.handlePasswordChange} value={this.state.password} autoComplete="new-password" />
                            <span className="focusRegisterInput" placeholder="Password"></span>
                            <FieldFeedbacks for="password">
                                <FieldFeedback when="*" />
                            </FieldFeedbacks>
                        </div>

                        <div className="registerElement">
                            <input className="registerInput form-control" type="password" name="password2" size="30" placeholder="Re-enter Password"
                                    required onChange={this.handlePassword2Change} value={this.state.password2} autoComplete="new-password" />
                            <span className="focusRegisterInput" placeholder="Re-enter Password"></span>
                            <FieldFeedbacks for="password">
                                <FieldFeedback when="*" />
                            </FieldFeedbacks>
                        </div>

                        <div className="registerElement">
                            <input className="registerInput form-control" type="text" name="groupCode" size="30" placeholder="Group Code"
                                    required onChange={this.handleGroupCodeChange} value={this.state.groupCode} autoComplete="new-password" />
                            <span className="focusRegisterInput" placeholder="Group Code"></span>
                            <FieldFeedbacks for="name">
                                <FieldFeedback when="*" />
                            </FieldFeedbacks>
                        </div>
                    
                        <div className="registerElement">
                            <button className="registerButton" onClick={this.handleSubmit}>Register</button>
                        </div>

                        <div className="loginElement">
                            <h3 className="errorMessage" style={errorMessageStyle}>{this.state.errorMessageText}</h3>
                        </div>

                    </div>
                </FormWithConstraints>
            </div>

        )
    }
}

const errorMessageStyle = {
    color: 'red',
    fontSize: '20px',
    textAlign: 'center'
}