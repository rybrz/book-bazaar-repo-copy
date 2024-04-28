import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ setApplyFilter }) => {
  const [sort, setSort] = useState('latest');
  const [condition, setCondition] = useState('');

  const handleApplyFilter = () => {
    setApplyFilter({ sort, condition });
  };

  return (
    <div className="sidebar">
      {/* <h2>Filter</h2> */}
      <div className="filter-option">
        <label htmlFor="genre">Sort by:</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="lastest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="title-az">Title: A-Z</option>
          <option value="title-za">Title: Z-A</option>
          <option value="price-lh">Price: Low to High</option>
          <option value="price-hl">Price: High to Low</option>
        </select>
      </div>
      <div className="filter-option">
        <label htmlFor="condition">Minimum Condition:</label>
        <select
          id="condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="">Any</option>
          <option value="new">New</option>
          <option value="used">Used</option>
          <option value="poor">Poor</option>
        </select>
      </div>
      <button className="apply-button" onClick={handleApplyFilter}>
        Apply Filter
      </button>
    </div>
  );
};

export default Filter;
