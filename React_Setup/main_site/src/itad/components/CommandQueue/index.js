import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    CommandTable,
    CommandTableHeaderRow,
    CommandTableHeaderCell,
    CommandTableRow,
    CommandCell
} from './CommandQueueElements';

const getJWTURL = "https://www.nautilusdevelopment.ca/api/itad/v1/session_token_to_jwt"
var getCommandDataURL = "https://www.nautilusdevelopment.ca/api/itad/v1/get_focused_robot_commands?";
var jwt = null;
var sessionToken = null;

var hardcodedRobotId = 70;

function CommandQueue() {

    const [commandTableData, setCommandTableData] = useState([]);

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
                    jwt = data['jwt'];

                    const id = setInterval(() => {
                        fetchData();
                    }, 5000);

                    return jwt;
                }
            } catch (error) {
                console.log(error);
            }
            
        });
    }

    const fetchData = async () => {

        if (jwt == null) {
            getJWT();
        } else {

            getCommandDataURL = "https://www.nautilusdevelopment.ca/api/itad/v1/get_focused_robot_commands?jwt=" + jwt + "&robotId=" + hardcodedRobotId;
            
            // Make post request
            const res = fetch(getCommandDataURL, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
    
                try {
                    if (data['error'] === "Server error, please try again in 10 minutes.") {
                        toast.error('Server error, please try again in 10 minutes.');
                    } else {
                        
                        // Command data obtained successfully
                        var newCommandData = [];
                        
                        var commandStatusTitle = "";

                        for (var i = 0; i < data.length; i++) {
                            
                            if (data[i]['command_status'] === "Available") {
                                commandStatusTitle = "Waiting For Robot";
                            } else {
                                commandStatusTitle = data[i]['command_status'];
                            }
    
                            newCommandData.push({
                                commandId: data[i]['command_id'],
                                commandDetails: data[i]['command_details'],
                                commandStatus: commandStatusTitle
                            });
                        }

                        setCommandTableData(newCommandData);
                    }
                } catch (error) {
                    console.log(error);
                }
                
            })
            .catch((error) => {
                console.log(error);
            });
            
        }

    };

    getJWT();

    return (
        <>
            <CommandTable>
                <CommandTableHeaderRow>
                    <CommandTableHeaderCell>Command ID</CommandTableHeaderCell>
                    <CommandTableHeaderCell>Command Details</CommandTableHeaderCell>
                    <CommandTableHeaderCell>Command Status</CommandTableHeaderCell>
                </CommandTableHeaderRow>
                {commandTableData.map((command, index) => (
                    <CommandTableRow key={index}>
                        <CommandCell key={index + "_" + command.commandId}>{command.commandId}</CommandCell>
                        <CommandCell key={index + "_" + command.commandDetails}>{command.commandDetails}</CommandCell>
                        <CommandCell key={index + "_" + command.commandStatus}>{command.commandStatus}</CommandCell>
                    </CommandTableRow>
                ))}
            </CommandTable>

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

export default CommandQueue
