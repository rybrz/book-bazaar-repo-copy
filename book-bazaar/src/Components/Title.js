// src/Title.js

import React from 'react';
import './Title.css';
import SearchBar from './SearchBar';
import { Profile } from './Profile';
// import { Slbuttons } from './Slbuttons.js';
import logo from '../Assets/book_bazaar_logo.png';
import { Link } from 'react-router-dom'; // Import Link component for routing

function Title({ setSearchQuery }) {
  // console.log({ setResults });
  //use results to effect marketplace showing
  return (
    <div className="Title">
      {/* Logo space */}
      <Link to="/">
        <img src={logo} alt="" className="logo" />
      </Link>
      {/* Search bar space */}
      <SearchBar setSearchQuery={setSearchQuery} />

      <Profile />
    </div>
  );
}

export default Title;
