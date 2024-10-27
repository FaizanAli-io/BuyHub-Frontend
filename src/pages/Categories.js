import React, { useState } from "react";
import axios from "axios";
import { useFetchData } from "../hooks/useFetchData";
import FormInput from "../components/FormInput";

const BASE_URL = "http://localhost:3000";

function Categories() {
  const [categories, setCategories] = useFetchData("categories");
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory) return;

    try {
      const response = await axios.post(`${BASE_URL}/categories`, {
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
            <FormInput
              type="text"
              name="categoryName"
              placeholder="Enter category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-gray-300"
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
