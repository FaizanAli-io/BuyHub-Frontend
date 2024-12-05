import React from "react";

function CategoryFilter({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded outline-none focus:ring-2 focus:ring-cyan-500"
    >
      <option value="">All Categories</option>
      {categories.length > 0 ? (
        categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))
      ) : (
        <option disabled>No Categories Available</option>
      )}
    </select>
  );
}

export default CategoryFilter;
