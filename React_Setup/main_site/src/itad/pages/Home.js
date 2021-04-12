import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import FloorPlan from '../components/main/FloorPlan';
import Footer from '../components/Footer';
import CommandSidebar from '../components/CommandSidebar';

function Home() {
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
      <div className='home'>
        <FloorPlan />
      </div>
      <CommandSidebar />
      <Footer />
    </>
  );
}

export default Home;
