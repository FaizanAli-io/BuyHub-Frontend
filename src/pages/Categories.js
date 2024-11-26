import React, { useState } from "react";
import axios from "axios";
import { useFetchData } from "../hooks/useFetchData";
import FormInput from "../components/FormInput";

const BASE_URL = "http://localhost:3000";

function Categories() {
  const [categories, setCategories] = useFetchData("categories");
  const [newCategory, setNewCategory] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory) return;

    try {
      const response = await axios.post(`${BASE_URL}/categories`, {
        name: newCategory,
      });
      setCategories((prevCategories) => [...prevCategories, response.data]);
      setNewCategory("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleEditCategory = async (categoryId) => {
    if (!editedCategoryName) return;

    try {
      const response = await axios.patch(
        `${BASE_URL}/categories/${categoryId}`,
        { name: editedCategoryName }
      );

      const updatedCategory = response.data;

      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === categoryId ? updatedCategory : category
        )
      );

      setEditingCategoryId(null);
      setEditedCategoryName("");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`${BASE_URL}/categories/${categoryId}`);
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== categoryId)
        );
      } catch (error) {
        console.error("Error deleting category:", error);
      }
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
          {categories
            .slice()
            .sort((a, b) => a.id - b.id)
            .map((category) => (
              <li
                key={category.id}
                className="border-b border-gray-600 pb-2 flex justify-between items-center"
              >
                {editingCategoryId === category.id ? (
                  <div className="flex-grow space-y-2">
                    <FormInput
                      type="text"
                      value={editedCategoryName}
                      onChange={(e) => setEditedCategoryName(e.target.value)}
                      className="w-full p-2 rounded bg-gray-700 text-gray-300"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditCategory(category.id)}
                        className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingCategoryId(null);
                          setEditedCategoryName("");
                        }}
                        className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-grow">
                    <strong>Name:</strong> {category.name}
                  </div>
                )}
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingCategoryId(category.id);
                      setEditedCategoryName(category.name);
                    }}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Categories;
