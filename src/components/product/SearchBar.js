import React from "react";

function SearchBar({ searchTerm, onSearchChange, placeholder }) {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={onSearchChange}
      placeholder={placeholder}
      className="w-full text-lg sm:text-xl bg-gray-800 text-gray-300 rounded-lg border border-gray-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none px-4 py-3"
    />
  );
}

export default SearchBar;
