import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/itad/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/itad/profile',
    icon: <FaIcons.FaUser />,
    cName: 'nav-text'
  },
  {
    title: 'Reports',
    path: '/itad/reports',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Team',
    path: '/itad/team',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Support',
    path: '/itad/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
  
];
