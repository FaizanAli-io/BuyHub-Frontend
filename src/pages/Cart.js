import React from "react";
import axios from "axios";
import { useFetchData } from "../hooks/useFetchData";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

const Cart = () => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useFetchData(`users/${user.id}/cart`);
  const navigate = useNavigate();

  // Refresh cart items after deletion or checkout
  const refreshCart = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${user.id}/cart`);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error refreshing cart:", error);
    }
  };

  // Checkout functionality
  const checkoutCart = async () => {
    try {
      await axios.post(`${BASE_URL}/orders`, { userId: user.id });
      refreshCart();
      navigate("/orders"); // Redirect to orders page
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  // Delete an item from the cart
  const deleteCartItem = async (itemId) => {
    try {
      await axios.delete(`${BASE_URL}/carts/${itemId}`); // DELETE request to backend
      console.log("Item deleted successfully:", itemId);
      refreshCart(); // Refresh cart after deletion
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  // Calculate the total cost
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
                  <th className="py-3 text-left">Actions</th>
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
                    <td className="py-3 text-gray-300">
                      <button
                        onClick={() => deleteCartItem(item.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
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
