import React, { Component } from 'react';
import {Router, Route, Redirect} from 'react-router';
import { createBrowserHistory } from 'history';
import Authentication from './itad/components/authentication/Authentication';
import Dashboard from './itad/components/Dashboard';

class App extends Component {

  constructor() {
    super();
    this.state = {
      isUserAuthenticated: false
    };
  }

  changeUserAuthenticationStatus() {
    this.setState({
      isUserAuthenticated: !this.state.isUserAuthenticated
    });
  }

  render() {
    return (

      <Router history={createBrowserHistory()}>

        <Route
            exact
            path={"/"} 
            render={() => {
                return (
                    this.state.isUserAuthenticated ? <Redirect to="/itad/home" /> : <Redirect to="/itad/authentication" /> 
                )
            }}
        />

        {/*   The main itad components were being hosted at the subdirectory of '/itad' because
              I had another application running at the root directory of '/'. You can remove the 
              addition of 'itad' in the URL by doing a project wide find replace. It is not
              necessary though.*/}
        <Route
            exact
            path={"/itad"} 
            render={() => {
                return (
                    this.state.isUserAuthenticated ? <Redirect to="/itad/home" /> : <Redirect to="/itad/authentication" /> 
                )
            }}
        />

        {/* Authentication route */}
        <Route exact path={"/itad/authentication"} component={Authentication} authenticationStatus={this.state.isUserAuthenticated} changeUserAuthenticationStatus={this.changeUserAuthenticationStatus} history={this.props.history} />
  
        {/* Dashboard route */}
        <Route exact path={"/itad/home"} component={Dashboard} history={this.props.history} />  

      </Router>

      
    );
  }
}

export default App;
