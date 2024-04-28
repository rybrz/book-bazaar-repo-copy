import React, { useState, useEffect } from 'react';
import './Title.css';
import './Menu.css';
import md5 from 'md5'; // Import md5 library
import { Link } from 'react-router-dom'; // Import Link component for routing
import { auth } from '../firebase'; // Import Firebase auth instance

function Menu({ onClose }) {
  const handleSignOut = async () => {
    try {
      await auth.signOut(); // Sign out the user
      onClose(); // Call onClose function to close the menu
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <div className="menu-container">
      <div className="menu">
        <ul>
          <li>
            <Link to="/my-listings">
              <div className="">My Listings</div>
            </Link>
          </li>
          <li>
            <div>Change Password</div>
          </li>
          <li>
            <div onClick={handleSignOut}>Sign Out</div>
          </li>
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export function Profile() {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const toggle = () => {
    console.log('hit');
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Clean-up function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const getGravatarUrl = (email) => {
    const hash = md5(email.trim().toLowerCase()); // Generate MD5 hash of the email address
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`; // Construct Gravatar URL
  };

  return (
    <div>
      <div className="auth-buttons">
        {user ? (
          <div className="profile-container">
            <img
              src={getGravatarUrl(user.email)}
              alt={auth.currentUser.email}
              className="profile"
              onClick={toggle}
            />
            {showMenu && <Menu onClose={toggle} />}
          </div>
        ) : (
          <>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
            <Link to="/login">
              <button>Log In</button>
            </Link>
          </>
        )}
      </div>
      {/* {showMenu && <Menu onClose={toggle} />} */}
    </div>
  );
}

export default Profile;
