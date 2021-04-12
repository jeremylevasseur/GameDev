import React from 'react';
import {
    LeftPane,
    RightPane,
    LeftPaneWrap,
    RightPaneWrap,
    CommandList,
    CommandItem
} from './CommandSidebarElements';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getJWTURL = "https://www.nautilusdevelopment.ca/api/itad/v1/session_token_to_jwt"
var submitCommandURL = "https://www.nautilusdevelopment.ca/api/itad/v1/send_command?"
var jwt = null;
var sessionToken = null;
var commandId = null;

var addedJWT = false;

var hardcodedRobotId = 70;

const index = () => {

    const getJWT = async () => {

        if (jwt != null) {
            return
        }

        sessionToken = localStorage.getItem("user_session_token");
        if (sessionToken == null) {
          // Go back to authentication component
          window.location.href = '/itad/authentication';
        }

        // Make post request
        const res = await fetch(getJWTURL, {
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
                    window.location.href = '/itad/authentication';
                } else {
                    // A JWT has been returned

                    if (!addedJWT) {

                        jwt = data['jwt'];
                        submitCommandURL = submitCommandURL + "jwt=" + jwt;
                        addedJWT = true;
                        return jwt;

                    } else {

                        return "";

                    }
                    
                }
            } catch (error) {
                console.log(error);
            }
            
        });
    }

    getJWT();

    const handleClick = async (commandNumber) => {
        console.log("Clicked on command number: " + commandNumber.toString());
        if (jwt == null) {
            console.log("Getting JWT");
            getJWT().then(function(jwt) {
                
                // Make post request
                const res = fetch(submitCommandURL, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        targetRobotId: hardcodedRobotId,
                        commandType: "Move",
                        commandDetails: "command:" + commandNumber.toString()
                    })
                })
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {

                    try {
                        if (data['status'] === "ERROR: Something is wrong with the post request structure.") {
                            
                            toast.error('There was an error with the post request');

                        } else if (data['status'] === "ERROR") {

                            toast.error('Server error. Please try again in 10 minutes.');

                        } else {
                            // User's data has been updated successfully
                            console.log(data);
                            toast.info("Command submitted.");

                            return

                        }
                    } catch (error) {
                        console.log(error);
                    }
                    
                })
                .catch((error) => {
                    console.log(error);
                });
                
            });
        } else {

            // Make post request
            const res = await fetch(submitCommandURL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    targetRobotId: hardcodedRobotId,
                    commandType: "Move",
                    commandDetails: "command:" + commandNumber.toString()
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {

                try {
                    if (data['status'] === "ERROR: Something is wrong with the post request structure.") {
                        
                        toast.error('There was an error with the post request');

                    } else if (data['status'] === "ERROR") {

                        toast.error('Server error. Please try again in 10 minutes.');

                    } else {
                        // User's data has been updated successfully
                        console.log(data);
                        commandId = data['commandId'];
                        toast.info("Command submitted.");

                        return

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

    return (
        <>
            <LeftPane>
                <LeftPaneWrap>
                    <CommandList>
                        <CommandItem onClick={() => handleClick(1)}>Command One</CommandItem>
                        <CommandItem onClick={() => handleClick(2)}>Command Two</CommandItem>
                        <CommandItem onClick={() => handleClick(3)}>Command Three</CommandItem>
                        <CommandItem onClick={() => handleClick(4)}>Command Four</CommandItem>
                    </CommandList>
                </LeftPaneWrap>
            </LeftPane>

            <RightPane>
                <RightPaneWrap>
                    <CommandList>
                        <CommandItem onClick={() => handleClick(5)}>Command Five</CommandItem>
                        <CommandItem onClick={() => handleClick(6)}>Command Six</CommandItem>
                        <CommandItem onClick={() => handleClick(7)}>Command Seven</CommandItem>
                        <CommandItem onClick={() => handleClick(8)}>Command Eight</CommandItem>
                    </CommandList>
                </RightPaneWrap>
            </RightPane>

            <ToastContainer
                position="bottom-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </>
    )
}

export default index
