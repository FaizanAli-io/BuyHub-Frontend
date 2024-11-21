import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const ProductCard = ({ product, user }) => {
  const navigate = useNavigate();
  const [addQuantity, setAddQuantity] = useState(0);
  const [cartItem, setCartItem] = useState(null);

  useEffect(() => {
    const fetchCartItem = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/${user.id}/cart`);
        const item = response.data.find(
          (item) => item.product.id === product.id
        );
        setCartItem(item);
        setAddQuantity(item ? item.quantity : 1);
      } catch (error) {
        console.error("Error fetching cart item:", error);
      }
    };

    fetchCartItem();
  }, [product.id, user.id]);

  const handleAddToCart = async () => {
    if (addQuantity > product.quantity) return;

    try {
      await axios.post(`${BASE_URL}/carts`, {
        userId: user.id,
        productId: product.id,
        quantity: addQuantity,
      });
      setAddQuantity(0);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleUpdateCart = async () => {
    if (addQuantity > product.quantity) return;

    try {
      if (addQuantity === 0) {
        await axios.delete(`${BASE_URL}/carts/${cartItem.id}`);
      } else {
        await axios.patch(`${BASE_URL}/carts/${cartItem.id}`, {
          quantity: addQuantity,
        });
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleNavigateToDetails = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div
      className="bg-gray-800 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 cursor-pointer"
      onClick={handleNavigateToDetails} // Redirect on click
    >
      <h3 className="text-xl font-bold text-white">{product.name}</h3>
      <p className="text-gray-300">{product.description}</p>
      <p className="text-gray-200">Price: ${product.price.toFixed(2)}</p>
      <p className="text-gray-200">Available: {product.quantity}</p>

      {user.role === "BUYER" && (
        <div className="mt-4 border-t border-gray-600 pt-4">
          <div className="flex items-center justify-between mt-2">
            <input
              type="number"
              min="0"
              max={product.quantity}
              value={addQuantity}
              onClick={(e) => e.stopPropagation()} // Prevent navigation on input click
              onChange={(e) =>
                setAddQuantity(
                  Math.max(
                    0,
                    Math.min(product.quantity, Number(e.target.value))
                  )
                )
              }
              className="w-16 p-1 border border-gray-600 rounded-md text-center bg-gray-700 text-white"
            />
            {cartItem ? (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation on button click
                  handleUpdateCart();
                }}
                className="ml-2 px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 transition"
              >
                Update Cart
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation on button click
                  handleAddToCart();
                }}
                className="ml-2 px-4 py-1 text-white bg-green-500 rounded hover:bg-green-600 transition"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
