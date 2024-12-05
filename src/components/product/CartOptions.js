import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const CartOptions = ({
  product,
  user,
  cartItem,
  setCartItem,
  setAddQuantity,
}) => {
  const [addQuantityState, setAddQuantityState] = useState(
    cartItem ? cartItem.quantity : 1
  );

  useEffect(() => {
    if (cartItem) {
      setAddQuantityState(cartItem.quantity);
    }
  }, [cartItem]);

  const handleAddToCart = async () => {
    if (addQuantityState > product.quantity) return;

    try {
      const response = await axios.post(`${BASE_URL}/cartitems`, {
        userId: user.id,
        productId: product.id,
        quantity: addQuantityState,
      });
      setCartItem(response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleUpdateCart = async () => {
    if (addQuantityState > product.quantity) return;

    try {
      if (addQuantityState === 0) {
        await axios.delete(`${BASE_URL}/cartitems/${cartItem.id}`);
      } else {
        await axios.patch(`${BASE_URL}/cartitems/${cartItem.id}`, {
          quantity: addQuantityState,
        });
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <div>
      <div className="border-t border-gray-500 w-full mb-4"></div>
      <div className="flex items-end justify-start space-x-4 mb-4">
        <input
          type="number"
          min="0"
          max={product.quantity}
          value={addQuantityState}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) =>
            setAddQuantityState(
              Math.max(0, Math.min(product.quantity, Number(e.target.value)))
            )
          }
          className="h-10 w-20 p-2 border-2 border-gray-500 rounded-lg text-center bg-gray-800 text-white transition duration-200 focus:ring-2 focus:ring-cyan-500"
        />

        {cartItem ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleUpdateCart();
            }}
            className="h-10 px-6 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Update Cart
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className="h-10 px-6 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition duration-200"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default CartOptions;
