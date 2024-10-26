import React from 'react';

function SortDropdown() {
  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="sortDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Sort By
      </button>
      <div className="dropdown-menu" aria-labelledby="sortDropdown">
        <button className="dropdown-item" type="button">Price</button>
        <button className="dropdown-item" type="button">Last Added</button>
        <button className="dropdown-item" type="button">Ratings</button>
      </div>
    </div>
  );
}

export default SortDropdown;
