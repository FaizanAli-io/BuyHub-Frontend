import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const ProductCard = ({ product, user }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    if (quantity > product.stock) {
      alert("Cannot add more than available stock.");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/carts`, {
        userId: user.id, // Assuming user object contains the user's ID
        productId: product.id, // Product ID to add to the cart
        quantity: quantity, // Selected quantity
      });
      alert(`Added ${quantity} of ${product.name} to cart.`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart.");
    }
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <h3 className="text-xl font-bold text-white">{product.name}</h3>
      <p className="text-gray-400">Price: ${product.price}</p>
      <p className="text-gray-400">Available: {product.quantity}</p>

      {user.role === "BUYER" && (
        <div className="mt-4">
          <input
            type="range"
            min="1"
            max={product.quantity}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-gray-300">Quantity: {quantity}</span>
          <button
            onClick={handleAddToCart}
            className="mt-2 w-full p-2 text-white bg-cyan-500 rounded hover:bg-cyan-600"
          >
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
