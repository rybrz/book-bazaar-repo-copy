import React, { useState } from 'react';
import { auth } from '../firebase';
import '../App.css'; // Import CSS file for styling
import './myListings.css'; // Import CSS file for styling
import Title from '../Components/Title'; // Title component
import Inbox from '../Components/Inbox'; // Title component
import MyListing from '../Components/MyListing'; // Title component

const MyListings = () => {
  return (
    <div className="app">
      <Title />
      <div className="listing-page-body">
        <div>
          <MyListing />
        </div>
        <div>
          <Inbox />
        </div>
      </div>
    </div>
  );
};

export default MyListings;
