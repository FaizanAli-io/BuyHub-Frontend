import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products`); // Use base URL
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories`); // Use base URL
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter(
        (product) => product.categoryId === Number(selectedCategory)
      )
    : products;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">
        Products
      </h2>

      {/* Category Filter Dropdown */}
      <div className="mb-6">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-white">{product.name}</h3>
            <p className="text-gray-300">{product.description}</p>
            <p className="text-lg font-bold text-cyan-400">${product.price}</p>
            <p className="text-gray-400">Quantity: {product.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
