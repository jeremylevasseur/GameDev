import React, { useEffect } from 'react';
import ProfilePane from '../components/ProfilePane/ProfilePane';
import Footer from '../components/Footer';
import '../itad.css'

function Profile() {
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
      <div className='profile'>
        <ProfilePane />
      </div>
      <div className='spacer'>
        
      </div>
      <Footer />
    </>
  );
}

export default Profile;
