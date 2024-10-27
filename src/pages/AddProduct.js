import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext"; // Import User Context
import FormInput from "../components/FormInput"; // Import your FormInput component
import Button from "../components/Button"; // Import your Button component

function AddProduct() {
  const { user } = useUser(); // Get user info
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    categoryId: "", // Category selection
  });
  const [categories, setCategories] = useState([]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      userId: user.id, // Assuming user has an id property
      categoryId: formData.categoryId,
      name: formData.name,
      description: formData.description,
      quantity: formData.quantity,
      price: parseFloat(formData.price),
    };

    try {
      await axios.post("http://localhost:3000/products", productData);
      // Clear the form after successful submission
      setFormData({
        name: "",
        price: "",
        description: "",
        quantity: "",
        categoryId: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Check if all fields are valid for enabling/disabling the button
  const isFormValid =
    formData.name &&
    formData.price &&
    formData.description &&
    formData.quantity &&
    formData.categoryId;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <form
        className="w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-lg rounded-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center text-cyan-400">
          Add Product
        </h2>

        <FormInput
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 text-gray-300 border-none rounded outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />

        <FormInput
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 text-gray-300 border-none rounded outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />

        <FormInput
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 text-gray-300 border-none rounded outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />

        <FormInput
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 text-gray-300 border-none rounded outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />

        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 text-gray-300 border-none rounded outline-none focus:ring-2 focus:ring-cyan-500"
          required
        >
          <option value="" disabled>
            Select a Category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <Button
          type="submit"
          className={`w-full px-4 py-2 font-semibold text-gray-900 bg-cyan-400 rounded hover:bg-cyan-300 ${
            !isFormValid ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isFormValid} // Disable the button if the form is not valid
        >
          Add Product
        </Button>
      </form>
    </div>
  );
}

export default AddProduct;
