import React from 'react';
import './App.css'; // Import CSS file for styling
import Title from './Components/Title'; // Title component
import Sidebar from './Components/Sidebar'; // Sidebar component
import { Outlet } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// marko's git commit test
// practice
// branch test

function App() {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
}

export default App;
