import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Footer from '../components/Footer';

function Team() {
  var sessionToken = null;

  useEffect(() => {
    // Function that runs when page loads
    // Need to look for the session token
    // Looking for session token
    sessionToken = localStorage.getItem("user_session_token");
    if (sessionToken == null) {
      // Go back to authentication component
      window.location.href = '/itad/authentication';
    }
  }, []);

  return (
    <>
      <div className='team'>
        <h1>Team</h1>
      </div>
      <Footer />
    </>
  );
}

export default Team;
