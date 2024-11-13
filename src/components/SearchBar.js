import React from "react";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="Search for products..."
        className="block w-full sm:w-72 bg-gray-800 text-gray-300 text-sm rounded-md border border-gray-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none px-4 py-2"
      />
    </div>
  );
}

export default SearchBar;
