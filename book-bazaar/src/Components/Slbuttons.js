import React from 'react';
import './Title.css';
import './Menu.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'; // Import Link component for routing

export function Slbuttons() {
  return (
    <div className="app">
      <div className="header">
        <div className="auth-buttons">
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Log In</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Slbuttons;
