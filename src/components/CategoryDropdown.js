import React from 'react';

function CategoryDropdown() {
  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="categoryDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Shop by Categories
      </button>
      <div className="dropdown-menu" aria-labelledby="categoryDropdown">
        <button className="dropdown-item" type="button">Electronics</button>
        <button className="dropdown-item" type="button">Footwear</button>
        <button className="dropdown-item" type="button">Kitchen</button>
        {/* Add more categories as needed */}
      </div>
    </div>
  );
}

export default CategoryDropdown;
