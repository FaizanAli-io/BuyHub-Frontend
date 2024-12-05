import axios from "axios";
import React, { useState, useEffect } from "react";

import { useUser } from "../context/UserContext";
import ProductCard from "../components/product/ProductCard";

const BASE_URL = "http://localhost:3000";

function TopProducts() {
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [topPurchasedProducts, setTopPurchasedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const ratingResponse = await axios.get(
          `${BASE_URL}/analytics/top-products/rating`
        );
        const purchasesResponse = await axios.get(
          `${BASE_URL}/analytics/top-products/purchases`
        );

        setTopRatedProducts(ratingResponse.data);
        setTopPurchasedProducts(purchasesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="w-full max-w-6xl p-8 space-y-6 bg-gray-800 shadow-lg rounded-lg text-gray-300">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-8">
          Top Products Analytics
        </h2>

        <section>
          <h3 className="text-2xl font-bold text-cyan-400 mb-4">
            Top Rated Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {topRatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                type="rating"
                user={user}
              />
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-cyan-400 mb-4">
            Top Purchased Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {topPurchasedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                type="purchases"
                user={user}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default TopProducts;
