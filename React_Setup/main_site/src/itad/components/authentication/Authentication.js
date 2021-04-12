import React, { Component } from 'react';
import { Spring } from 'react-spring/renderprops';
import { withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Style from 'style-it';

import Title from './Title';
import Login from './Login';
import Register from './Register';

import '../../itad.css';


export class Authentication extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogInActive: true
    };
    this.changeState = this.changeState.bind(this);
    this.executeRegisterToast = this.executeRegisterToast.bind(this);
  }

  changeState() {
    this.setState({
      isLogInActive: !this.state.isLogInActive
    });
  }

  executeRegisterToast() {
    toast.success("Successfully Registered");
  }

  componentDidMount() {

    // Checking to see if there is a stored session token
    var sessionToken = localStorage.getItem('user_session_token');
    
    var lengthOfSessionToken = 0;

    try {
      lengthOfSessionToken = sessionToken.length;
    } catch (error) {
      lengthOfSessionToken = 4;
    }
    
    // If there is a session token, head to the dashboard
    if (lengthOfSessionToken != 4) {
      this.props.history.push({
        pathname: '/itad/home'
      });
    }

  }

  render() {
    const { isLogInActive } = this.state;
    const current = isLogInActive ? "Register" : "Login";
    const currentActive = isLogInActive ? "login" : "register";
    return (
      <div className="App">

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

        <Title />

        <div className="main_container">

          {isLogInActive && 
            <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 500, duration: 1000 }}>
              {props => (
                <div style={props}>
                  
                  <Login containerRef={(ref) => this.current = ref} history={this.props.history} changeState={this.changeState} isLogInActive={this.props.isLogInActive}/>
                  
                </div>
              )}
            </Spring>
          }

          {!isLogInActive && 
            <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 500, duration: 500 }}>
              {props => (
                <div style={props}>
                  
                  <Register containerRef={(ref) => this.current = ref} history={this.props.history} changeState={this.changeState} isLogInActive={this.state.isLogInActive} executeRegisterToast={this.executeRegisterToast}/>
                  
                </div>
              )}
            </Spring>
          }

        </div>

        <div className="bottom_options_container">
          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 500, duration: 500 }}>
            {props => (
              <div style={props}>
                
                <BottomOptions 
                  current={current}
                  currentActive={currentActive}
                  containerRef={ref => (this.rightSide = ref)}
                  onClick={this.changeState.bind(this)}
                />
                
              </div>
            )}
          </Spring>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
        <ToastContainer />

      </div>
    );
  }
}

const BottomOptions = props => {
  return (
    <div className="optionsElement">
      <a href="#" className="txt2">
        Forgot Credentials?
      </a>
      &nbsp; | &nbsp;
      <a href="#" className="txt2" ref={props.containerRef} onClick={props.onClick}>
        {props.current}
      </a>
    </div>
  )
}

export default withRouter(Authentication);
