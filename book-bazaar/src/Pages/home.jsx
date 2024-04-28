import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase';
import '../App.css'; // Import CSS file for styling
import Title from '../Components/Title'; // Title component
import Sidebar from '../Components/Sidebar'; // Sidebar component
import Marketplace from '../Components/Marketplace'; // Sidebar component
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [applyFilter, setApplyFilter] = useState('');

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // navigate('/login');
    navigate('/');
  };

  return (
    <div className="app">
      <Title setSearchQuery={setSearchQuery} />
      <div className="body-body">
        <Sidebar setApplyFilter={setApplyFilter} />
        <Marketplace searchQuery={searchQuery} applyFilter={applyFilter} />
      </div>
      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default Home;
