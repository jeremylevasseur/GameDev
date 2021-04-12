import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { NavbarTitle } from './NavbarElements';
import { Button } from '../ButtonElements';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [navbarTitle, setNavbarTitle] = useState("Home");

  const showSidebar = () => setSidebar(!sidebar);

  const primary = 1;
  const dark = 1;
  const dark2 = 1;

  function logOut() {
    localStorage.removeItem('user_session_token');
    window.location.href = '/itad/authentication';
  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <NavbarTitle>{navbarTitle}</NavbarTitle>
          <Button
            to='#'
            smooth={true}
            duration={500}
            spy={true}
            exact="True" 
            offset={0} 
            primary={primary ? 1 : 0} 
            dark={dark ? 1 : 0} 
            dark2={dark2 ? 1 : 0}
            onClick={logOut}
          >
            Log Out
          </Button>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} onClick={() => setNavbarTitle(item.title)}>
                  <Link to={item.path}>
                    {item.icon}
                    <span className="navbar-span">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
