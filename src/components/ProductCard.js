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
      const response = await axios.post(`${BASE_URL}/cartitems`, {
        userId: user.id,
        productId: product.id,
        quantity: addQuantity,
      });

      setCartItem(response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleUpdateCart = async () => {
    if (addQuantity > product.quantity) return;

    try {
      if (addQuantity === 0) {
        await axios.delete(`${BASE_URL}/cartitems/${cartItem.id}`);
      } else {
        await axios.patch(`${BASE_URL}/cartitems/${cartItem.id}`, {
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
      className="bg-gray-800 rounded-lg shadow-lg p-6 transition-all transform hover:scale-105 cursor-pointer hover:shadow-xl"
      onClick={handleNavigateToDetails}
    >
      <div className="flex flex-col items-center justify-center mb-4">
        <h3 className="text-2xl font-semibold text-white mb-2 hover:text-cyan-400 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-300 text-center">{product.description}</p>
      </div>

      <div className="text-center mb-4">
        <p className="text-gray-200 text-lg font-medium">
          Price: ${product.price.toFixed(2)}
        </p>
        <p className="text-gray-400">Available: {product.quantity}</p>
      </div>

      {user.role === "BUYER" && (
        <div className="mt-4 border-t border-gray-700 pt-4">
          <div className="flex items-center justify-between">
            <input
              type="number"
              min="0"
              max={product.quantity}
              value={addQuantity}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) =>
                setAddQuantity(
                  Math.max(
                    0,
                    Math.min(product.quantity, Number(e.target.value))
                  )
                )
              }
              className="w-16 p-2 border border-gray-600 rounded-lg text-center bg-gray-700 text-white transition duration-200 focus:ring-2 focus:ring-cyan-400"
            />

            {cartItem ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateCart();
                }}
                className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Update Cart
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
                className="ml-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
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
