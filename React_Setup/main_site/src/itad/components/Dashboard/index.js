import React from 'react';
import Home from '../../pages/Home';
import Reports from '../../pages/Reports';
import Team from '../../pages/Team';
import Profile from '../../pages/Profile';
import Support from '../../pages/Support';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../Navbar';
import Style from 'style-it';
import "../../../App.css";

const Dashboard = () => {

    return (
        <>
            <Style>
            {`
                html {
                    background-color: #ebebeb;
                    max-width: 100%;
                    overflow-x: hidden;
                }
            `}
            </Style>

            {/* This is the router for after authentication.*/}
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/itad/home' exact component={Home} />
                    <Route path='/itad/reports' exact component={Reports} />
                    <Route path='/itad/team' exact component={Team} />
                    <Route path='/itad/profile' exact component={Profile} />
                    <Route path='/itad/support' exact component={Support} />
                </Switch>
            </Router>
        </>
    )
}

export default Dashboard
