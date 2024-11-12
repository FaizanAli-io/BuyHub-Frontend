import React from "react";

function PriceFilter({ priceFlter, handlePriceFilter }) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2">
      <label
        htmlFor="price-filter"
        className="text-sm font-medium text-gray-300"
      >
        Sort by:
      </label>
      <select
        id="price-filter"
        value={priceFlter}
        onChange={handlePriceFilter}
        className="block w-full sm:w-auto bg-gray-800 text-gray-300 text-sm rounded-md border border-gray-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none px-4 py-2"
      >
        <option value="default" disabled hidden>
          Select an option
        </option>
        <option value="high-to-low">(Price) Highest to lowest</option>
        <option value="low-to-high">(Price) Lowest to highest</option>
      </select>
    </div>
  );
}

export default PriceFilter;
