import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useFetchData } from "../hooks/useFetchData";
import ProductCard from "../components/product/ProductCard";
import SearchBar from "../components/product/SearchBar";
import ProductSorter from "../components/product/ProductSorter";
import { IoArrowBackCircle } from "react-icons/io5";
import {
  FaEye,
  FaTshirt,
  FaCouch,
  FaShoePrints,
  FaMobileAlt,
  FaSprayCan,
  FaBath,
} from "react-icons/fa";

function Products() {
  const { user } = useUser();
  const products = useFetchData("products")[0];
  const categories = useFetchData("categories")[0];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [showAllProducts, setShowAllProducts] = useState(false);

  const sortProducts = (products) => {
    switch (sortOption) {
      case "high-to-low":
        return [...products].sort((a, b) => b.price - a.price);
      case "low-to-high":
        return [...products].sort((a, b) => a.price - b.price);
      case "alphabetical-a-z":
        return [...products].sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
        );
      case "alphabetical-z-a":
        return [...products].sort((a, b) =>
          b.name.localeCompare(a.name, undefined, { sensitivity: "base" })
        );
      case "newest-to-oldest":
        return [...products].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "oldest-to-newest":
        return [...products].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      default:
        return products;
    }
  };

  const categoryIcons = {
    furniture: <FaCouch className="text-cyan-400 text-5xl" />,
    apparel: <FaTshirt className="text-cyan-400 text-5xl" />,
    footwear: <FaShoePrints className="text-cyan-400 text-5xl" />,
    electronics: <FaMobileAlt className="text-cyan-400 text-5xl" />,
    perfumes: <FaSprayCan className="text-cyan-400 text-5xl" />,
    cosmetics: <FaBath className="text-cyan-400 text-5xl" />,
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowAllProducts(false);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = sortProducts(
    products.filter(
      (product) =>
        (showAllProducts ||
          selectedCategory === null ||
          product.categoryId === Number(selectedCategory)) &&
        (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-800 via-gray-900 to-black p-8">
      <h2 className="text-4xl font-bold text-center text-cyan-400 mb-10">
        Explore Our Products
      </h2>

      {/* Search Bar */}
      <div className="w-full max-w-3xl mx-auto mb-8">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          placeholder={
            selectedCategory === null && !showAllProducts
              ? "Search categories..."
              : "Search products..."
          }
        />
      </div>

      {/* Sorter */}
      {(selectedCategory !== null || showAllProducts) && (
        <div className="w-full max-w-3xl mx-auto mb-8">
          <ProductSorter
            filterValue={sortOption}
            onFilterChange={(e) => setSortOption(e.target.value)}
          />
        </div>
      )}

      {/* Show All Products Button */}
      {!showAllProducts && (
        <div className="flex justify-center mb-8">
          <button
            className="flex items-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-cyan-700 transition duration-200 text-lg font-medium"
            onClick={() => {
              setShowAllProducts(true);
              setSelectedCategory(null);
            }}
          >
            <FaEye size={20} />
            Show All Products
          </button>
        </div>
      )}

      {/* Back Button */}
      {showAllProducts && (
        <div className="flex justify-start mb-8">
          <button
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-500 transition text-lg font-medium"
            onClick={() => {
              setShowAllProducts(false);
              setSearchTerm("");
            }}
          >
            <IoArrowBackCircle size={32} />
            Back to Categories
          </button>
        </div>
      )}

      {/* Categories or Products */}
      {selectedCategory === null && !showAllProducts ? (
        <div>
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="cursor-pointer border-2 border-gray-700 rounded-lg p-6 flex flex-col items-center hover:border-cyan-400 hover:scale-105 transition-transform duration-200"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {categoryIcons[category.name.toLowerCase()] || (
                    <div className="text-cyan-400 text-5xl">?</div>
                  )}
                  <p className="text-white text-lg font-semibold mt-4">
                    {category.name}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-white">
              No categories match your search. Try a different term.
            </p>
          )}
        </div>
      ) : (
        <div>
          {!showAllProducts && (
            <div
              className="flex items-center gap-2 cursor-pointer text-cyan-400 hover:text-cyan-500 transition mb-6"
              onClick={() => setSelectedCategory(null)}
            >
              <IoArrowBackCircle size={32} />
              <span className="text-lg font-medium">Back to Categories</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} user={user} />
              ))
            ) : (
              <p className="text-center text-white col-span-full">
                No products found. Try another search or category.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
