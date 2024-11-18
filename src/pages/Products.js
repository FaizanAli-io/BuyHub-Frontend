import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useFetchData } from "../hooks/useFetchData";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { IoArrowBackCircle } from "react-icons/io5"; // Import the icon
import { FaTshirt, FaCouch, FaShoePrints, FaMobileAlt, FaSprayCan, FaBath } from "react-icons/fa"; // Import icons

function Products() {
  const { user } = useUser();
  const products = useFetchData("products")[0];
  const categories = useFetchData("categories")[0];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Map category names to icons
  const categoryIcons = {
    furniture: <FaCouch className="text-cyan-400 text-4xl" />,
    apparel: <FaTshirt className="text-cyan-400 text-4xl" />,
    footwear: <FaShoePrints className="text-cyan-400 text-4xl" />,
    electronics: <FaMobileAlt className="text-cyan-400 text-4xl" />,
    perfume: <FaSprayCan className="text-cyan-400 text-4xl" />,
    cosmetics: <FaBath className="text-cyan-400 text-4xl" />,
  };

  // Handle category selection
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter categories and products based on the search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter((product) =>
    (selectedCategory === null || product.categoryId === Number(selectedCategory)) &&
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <h2 className="text-4xl font-semibold text-center text-cyan-400 mb-8">
        Browse Our Products
      </h2>

      {/* Search Bar */}
      <div className="w-full max-w-lg mx-auto mb-8">
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      </div>

      {/* Categories or Products */}
      {selectedCategory === null ? (
        <div>
          {/* Display categories based on the search term */}
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="cursor-pointer border-2 border-gray-600 rounded-lg p-4 flex flex-col items-center hover:border-cyan-400 transition"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {/* Display Icon Based on Category */}
                  {categoryIcons[category.name.toLowerCase()] || (
                    <div className="text-cyan-400 text-4xl">?</div>
                  )}
                  <p className="text-white text-lg font-semibold mt-4">{category.name}</p>
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
          <div
            className="flex items-center gap-2 cursor-pointer text-cyan-400 hover:text-cyan-600 transition mb-4"
            onClick={() => setSelectedCategory(null)}
          >
            <IoArrowBackCircle size={32} /> {/* Back Icon */}
            <span className="text-lg font-medium">Back to Categories</span>
          </div>

          {/* Display filtered products */}
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
