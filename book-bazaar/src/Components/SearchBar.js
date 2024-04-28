import React, { useState } from 'react';
import './Title.css';
import search_icon from '../Assets/search_icon.svg';

export function SearchBar({ setSearchQuery }) {
  const [input, setInput] = useState('');

  const handleChange = (value) => {
    setInput(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Regular expression to match only English letters
    const validCharactersRegex = /^[a-zA-Z]*$/;

    // Check if input consists only of English letters
    if (validCharactersRegex.test(input)) {
      console.log(input);
      setSearchQuery(input);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search by ISBN, Title, or Author..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        // onKeyDown={handleKeyDown}
      />
      <img src={search_icon} alt="" />
    </form>
  );
}

export default SearchBar;
