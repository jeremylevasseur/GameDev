import React, { Component } from 'react';
import { FormWithConstraints, FieldFeedbacks, FieldFeedback } from 'react-form-with-constraints';
import { withRouter } from 'react-router-dom';

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessageText: '',
            errorMessageVisibility: false
        }
    }

    handleUsernameChange = e => {
        this.form.validateFields(e.target);
        this.setState({username: e.target.value});
    }

    handlePasswordChange = e => {
        this.form.validateFields(e.target);
        this.setState({password: e.target.value});
    }

    handleSubmit = e => {
        e.preventDefault();
        
        var self = this;
        var authenticateURL = "https://www.nautilusdevelopment.ca/api/itad/v1/authenticate";
        var enteredUsername = this.state.username;
        var enteredPassword = this.state.password;

        var conditionOne = enteredUsername === '';
        var conditionTwo = enteredPassword === '';
        
        if (conditionOne || conditionTwo) {
            
            // One or more fields are empty
            this.setState({
                errorMessageText: "One or more fields are empty.",
                errorMessageVisibility: true
            });

        } else {
            
            // Make login post request
            const res = fetch(authenticateURL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: enteredUsername,
                    password: enteredPassword,
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {

                try {
                    if (data['error'] === "The username or password is incorrect.") {
                        // Invalid credentials
                        self.setState({
                            errorMessageText: "Invalid Credentials.",
                            errorMessageVisibility: true
                        });
                    } else {
                        // User has successfully logged in
                        var userSessionToken = data['session_token'];
                        localStorage.setItem('user_session_token', userSessionToken);
                        
                        self.props.history.push({
                            pathname: '/itad/home',
                            data: data
                        })
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
    

    render() {
        return (
            <div className="login" ref={this.props.containerRef}>
                <FormWithConstraints
                    ref={form => this.form = form}
                    onSubmit={this.contactSubmit}
                    noValidate>

                    <div className="row">

                        <div className="loginElement">
                            <h4 className="loginTitle">Login</h4>
                        </div>

                        <div className="loginElement">
                            <input className="loginInput form-control" name="username" size="30" placeholder="Username"
                                    required onChange={this.handleUsernameChange} value={this.state.username} autoComplete="new-password" />

                            <span className="focusLoginInput" placeholder="Username"></span>

                            <FieldFeedbacks for="name">
                                <FieldFeedback when="*" />
                            </FieldFeedbacks>
                        </div>

                        <div className="loginElement">
                            <input className="loginInput form-control" type="password" name="password" size="30" placeholder="Password"
                                    required onChange={this.handlePasswordChange}  value={this.state.password} autoComplete="new-password" />
                            <span className="focusLoginInput" placeholder="Password"></span>
                            <FieldFeedbacks for="email">
                                <FieldFeedback when="*" />
                            </FieldFeedbacks>
                        </div>
                    
                        <div className="loginElement">
                            <button className="loginButton" onClick={this.handleSubmit}>Login</button>
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


export default withRouter(Login);