import React, { useEffect, useState } from "react";
import axios from "axios";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory) return;

    try {
      const response = await axios.post("http://localhost:3000/categories", {
        name: newCategory,
      });
      setCategories((prevCategories) => [...prevCategories, response.data]);
      setNewCategory(""); // Clear input field
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-lg rounded-lg text-gray-300">
        <h2 className="text-3xl font-bold text-center text-cyan-400">
          Categories
        </h2>

        {/* Add Category Form */}
        <form onSubmit={handleAddCategory} className="space-y-4">
          <div>
            <label className="block text-gray-400">Category Name</label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-gray-300"
              placeholder="Enter category name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-cyan-500 rounded hover:bg-cyan-600"
          >
            Add Category
          </button>
        </form>

        {/* Display Categories */}
        <ul className="space-y-4">
          {categories.map((category) => (
            <li key={category.id} className="border-b border-gray-600 pb-2">
              <strong>Name:</strong> {category.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Categories;
