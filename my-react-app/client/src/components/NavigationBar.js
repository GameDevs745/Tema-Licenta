import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/swipe">Swipe</Link>
        </li>
        <li>
          <Link to="/chat">Chat</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;