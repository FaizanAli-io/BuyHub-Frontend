import React from "react";

function ProductSorter({ filterValue, onFilterChange }) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
      <label
        htmlFor="product-sorter"
        className="text-lg sm:text-xl font-medium text-gray-300"
      >
        Sort by:
      </label>
      <select
        id="product-sorter"
        value={filterValue}
        onChange={onFilterChange}
        className="text-lg sm:text-xl w-full sm:w-auto bg-gray-800 text-gray-300 rounded-md border border-gray-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none px-4 py-3"
      >
        <option value="default" disabled hidden>
          Select an option
        </option>
        <option value="high-to-low">(Price) Highest to lowest</option>
        <option value="low-to-high">(Price) Lowest to highest</option>
        <option value="alphabetical-a-z">Alphabetical (A-Z)</option>
        <option value="alphabetical-z-a">Alphabetical (Z-A)</option>
        <option value="newest-to-oldest">Newest to Oldest</option>
        <option value="oldest-to-newest">Oldest to Newest</option>
      </select>
    </div>
  );
}

export default ProductSorter;
