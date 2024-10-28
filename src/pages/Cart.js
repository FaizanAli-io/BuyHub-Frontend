import React from "react";
import axios from "axios";
import { useFetchData } from "../hooks/useFetchData";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const BASE_URL = "http://localhost:3000";

const Cart = () => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useFetchData(`users/${user.id}/cart`);
  const navigate = useNavigate(); // Initialize navigate for redirection

  const refreshCart = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${user.id}/cart`);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error refreshing cart:", error);
    }
  };

  const checkoutCart = async () => {
    try {
      await axios.post(`${BASE_URL}/orders`, { userId: user.id });
      refreshCart();
      navigate("/orders"); // Redirect to the orders page after checkout
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const totalCost = cartItems
    .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-8">
      <h2 className="text-3xl font-bold text-center text-cyan-300 mb-6">
        {user.name}'s Cart
      </h2>
      <div className="bg-gray-700 p-6 rounded-lg">
        {cartItems.length === 0 ? (
          <p className="text-gray-400 text-center">Your cart is empty.</p>
        ) : (
          <>
            <table className="w-full text-gray-200">
              <thead>
                <tr className="border-b border-gray-500">
                  <th className="py-3 text-left">Item</th>
                  <th className="py-3 text-left">Price</th>
                  <th className="py-3 text-left">Quantity</th>
                  <th className="py-3 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-500">
                    <td className="py-3 text-gray-300">{item.product.name}</td>
                    <td className="py-3 text-gray-300">
                      ${item.product.price.toFixed(2)}
                    </td>
                    <td className="py-3 text-gray-300">{item.quantity}</td>
                    <td className="py-3 text-gray-300">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 text-xl font-semibold text-gray-300 text-right">
              Total Cost: ${totalCost}
            </div>
            <button
              onClick={checkoutCart}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
