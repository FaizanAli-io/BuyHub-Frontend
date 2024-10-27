import React from "react";
import { useFetchData } from "../hooks/useFetchData";
import { useUser } from "../context/UserContext";

const Cart = () => {
  const { user } = useUser();
  const cartItems = useFetchData(`users/${user.id}/cart`)[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">
        Your Cart
      </h2>
      <div className="bg-gray-800 p-4 rounded-lg">
        {cartItems.length === 0 ? (
          <p className="text-gray-300 text-center">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="border-b border-gray-600 pb-2">
                <strong>Product Name:</strong> {item.product.name} <br />
                <strong>Quantity:</strong> {item.quantity} <br />
                <strong>Price:</strong> ${item.product.price} <br />
                <strong>Total:</strong> $
                {(item.product.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
