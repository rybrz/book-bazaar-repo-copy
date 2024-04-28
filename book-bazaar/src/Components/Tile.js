import React from 'react';
// import './Title.css';
import './Marketplace.css';

// Define your Tile component
const Tile = ({ entry, onClick }) => {
  const { imgurl, price, title, author, condition, id } = entry;
  const handleClick = () => {
    onClick(entry); // Pass the ID when the tile is clicked
  };
  // controls the changes of CSS for different conditions
  let conditionClass;
  switch (condition) {
    case 'new':
      conditionClass = 'new';
      break;
    case 'used':
      conditionClass = 'used';
      break;
    case 'poor':
      conditionClass = 'poor';
      break;
    default:
      conditionClass = '';
  }

  return (
    <div className="tile" onClick={handleClick}>
      <div className="image-container">
        <img src={imgurl} alt="Book Cover" />
        <div className="overlay">
          <span className="price">${price}</span>{' '}
          <span className={`condition ${conditionClass}`}>{condition}</span>
          <div className="details">
            {title} by {author}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tile;
