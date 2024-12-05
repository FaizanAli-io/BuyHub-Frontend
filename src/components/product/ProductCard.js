import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartOptions from "./CartOptions";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const ProductCard = ({ product, user, type = null }) => {
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState(null);

  useEffect(() => {
    const fetchCartItem = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/cartitems/user/${user.id}`
        );
        const item = response.data.find(
          (item) => item.product.id === product.id
        );
        setCartItem(item);
      } catch (error) {
        console.error("Error fetching cart item:", error);
      }
    };

    fetchCartItem();
  }, [product.id, user.id]);

  const handleNavigateToDetails = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div
      className="bg-gray-700 rounded-lg shadow-xl p-6 flex flex-col justify-between transition-transform transform hover:scale-105 cursor-pointer hover:shadow-2xl"
      onClick={handleNavigateToDetails}
    >
      <div className="flex flex-col items-center justify-center mb-4">
        <h3 className="text-2xl font-semibold text-white mb-2 hover:text-cyan-400 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-300 text-center">
          {product.description.length > 50
            ? `${product.description.slice(0, 50)}...`
            : product.description}
        </p>
      </div>

      <div className="text-center mb-4">
        <p className="text-gray-200 text-lg font-medium">
          Price: ${product.price.toFixed(2)}
        </p>
        <p className="text-gray-400">
          {type === "rating" ? (
            <>
              Average Rating: {product.avgRating}{" "}
              <span className="text-yellow-400">⭐</span>
            </>
          ) : type === "purchased" ? (
            <>Total Purchased: {product.totalPurchased}</>
          ) : (
            <>Available: {product.quantity}</>
          )}
        </p>
      </div>

      {user.role === "BUYER" && (
        <CartOptions
          product={product}
          user={user}
          cartItem={cartItem}
          setCartItem={setCartItem}
          setAddQuantity={() => {}}
        />
      )}
    </div>
  );
};

export default ProductCard;
