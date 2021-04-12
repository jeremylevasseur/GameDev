import React, { Component } from 'react';
import { Spring } from 'react-spring/renderprops';
import { withRouter } from 'react-router-dom';
import Style from 'style-it';
import UserData from './UserData'
import EditProfileData from './EditProfileData'
import FloorPlan from './FloorPlan'
import './css/main_page.css'

export class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editProfilePageVisibility: false,
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
        this.changeState = this.changeState.bind(this);
    }
    

    handleLogOut = e => {
        localStorage.removeItem('user_session_token');

        var self = this;
        self.props.history.push({
            pathname: '/itad/authentication'
        })
    }

    changeState() {
        this.setState({
            editProfilePageVisibility: !this.state.editProfilePageVisibility
        });
    }

    render() {
        const { editProfilePageVisibility } = this.state;

        return (
            <div className="userProfile">
                <Style>
                    {`
                        html {
                        height: 100%;
                        background-color: #ebebeb;
                        font-size: 1em;
                        line-height: 1.4;
                        }
                    `}
                </Style>

                <div className="topBar">
                    <Spring from={{ opacity: 0, marginTop: 500 }} to={{ opacity: 1, marginTop: 10 }} config={{duration: 700 }}>
                        {props => (
                            <div style={props}>
                                <UserData changeState={this.changeState} editProfilePageVisibility={this.state.editProfilePageVisibility} userData={this.state.userData}/>
                            </div>
                        )}
                    </Spring>
                </div>

                <div>

                    <FloorPlan/>

                </div>

                {editProfilePageVisibility && 
                    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 500, duration: 1000 }}>
                    {props => (
                        <EditProfileData changeState={this.changeState} editProfilePageVisibility={this.state.editProfilePageVisibility} userData={this.state.userData}/>
                    )}
                    </Spring>
                }

                <div className="logOut">
                    <button onClick={this.handleLogOut} id="logOutButton">Log Out</button>
                </div>

                <div className="spacer">

                </div>
            </div>
        );
    }
}

export default withRouter(MainPage);
