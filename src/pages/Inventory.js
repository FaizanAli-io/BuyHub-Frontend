import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useFetchData } from "../hooks/useFetchData";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";

const Inventory = () => {
  const { user } = useUser();
  const products = useFetchData(`users/${user.id}/products`)[0];
  const categories = useFetchData("categories")[0];
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) => product.categoryId === Number(selectedCategory)
      )
    : products;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">
        Inventory
      </h2>
      <div className="mb-6">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
