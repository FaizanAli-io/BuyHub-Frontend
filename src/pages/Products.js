import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useFetchData } from "../hooks/useFetchData";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import ProductSorter from "../components/ProductSorter";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaEye, FaTshirt, FaCouch, FaShoePrints, FaMobileAlt, FaSprayCan, FaBath } from "react-icons/fa";

function Products() {
  const { user } = useUser();
  const products = useFetchData("products")[0];
  const categories = useFetchData("categories")[0];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [showAllProducts, setShowAllProducts] = useState(false);

  const sortProducts = (products) => {
    if (sortOption === "high-to-low") {
      return [...products].sort((a, b) => b.price - a.price);
    } else if (sortOption === "low-to-high") {
      return [...products].sort((a, b) => a.price - b.price);
    } else if (sortOption === "alphabetical-a-z") {
      return [...products].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      );
    } else if (sortOption === "alphabetical-z-a") {
      return [...products].sort((a, b) =>
        b.name.localeCompare(a.name, undefined, { sensitivity: "base" })
      );
    }
    return products;
  };

  const handleSortChange = (e) => setSortOption(e.target.value);

  const categoryIcons = {
    furniture: <FaCouch className="text-cyan-400 text-4xl" />,
    apparel: <FaTshirt className="text-cyan-400 text-4xl" />,
    footwear: <FaShoePrints className="text-cyan-400 text-4xl" />,
    electronics: <FaMobileAlt className="text-cyan-400 text-4xl" />,
    perfume: <FaSprayCan className="text-cyan-400 text-4xl" />,
    cosmetics: <FaBath className="text-cyan-400 text-4xl" />,
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowAllProducts(false);
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = sortProducts(
    products.filter(
      (product) =>
        (showAllProducts ||
          (selectedCategory === null ||
            product.categoryId === Number(selectedCategory))) &&
        (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <h2 className="text-4xl font-semibold text-center text-cyan-400 mb-8">
        Browse Our Products
      </h2>

      {/* Search Bar */}
      <div className="w-full max-w-2xl mx-auto mb-8">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          placeholder={
            selectedCategory === null && !showAllProducts
              ? "Search categories"
              : "Search products"
          }
        />
      </div>

      {/* Sorter */}
      {selectedCategory !== null && !showAllProducts && (
        <div className="w-full max-w-2xl mx-auto mb-8">
          <ProductSorter
            filterValue={sortOption}
            onFilterChange={handleSortChange}
          />
        </div>
      )}

      {/* Show All Products Button */}
      {!showAllProducts && (
        <div className="flex justify-center mb-8">
          <button
            className="flex items-center gap-2 bg-cyan-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-cyan-600 transition duration-200 text-lg font-medium"
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
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-600 transition text-lg font-medium"
            onClick={() => {
              setShowAllProducts(false);
              setSearchTerm(""); // Clear search
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="cursor-pointer border-2 border-gray-600 rounded-lg p-4 flex flex-col items-center hover:border-cyan-400 transition"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {categoryIcons[category.name.toLowerCase()] || (
                    <div className="text-cyan-400 text-4xl">?</div>
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
              className="flex items-center gap-2 cursor-pointer text-cyan-400 hover:text-cyan-600 transition mb-4"
              onClick={() => setSelectedCategory(null)}
            >
              <IoArrowBackCircle size={32} />
              <span className="text-lg font-medium">Back to Categories</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
