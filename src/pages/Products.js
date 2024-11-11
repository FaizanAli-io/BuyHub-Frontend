import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useFetchData } from "../hooks/useFetchData";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import PriceFilter from "../components/PriceFilter";

function Products() {
  const { user } = useUser();
  const products = useFetchData("products")[0];
  const categories = useFetchData("categories")[0];
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceFilter, setPriceFilter] = useState("default");

 
  const filteredProductsByCategory = selectedCategory
    ? products.filter(
        (product) => product.categoryId === Number(selectedCategory)
      )
    : products;

 
  const sortedProducts = [...filteredProductsByCategory].sort((a, b) => {
    if (priceFilter === "high-to-low") {
      return b.price - a.price;
    } else if (priceFilter === "low-to-high") {
      return a.price - b.price; 
    }
    return 0; 
  });

  // Handle price filter change
  const handlePriceFilter = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">
        Products
      </h2>
      <div className="mb-6 flex justify-between items-center">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <PriceFilter priceFlter={priceFilter} handlePriceFilter={handlePriceFilter} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Products;
