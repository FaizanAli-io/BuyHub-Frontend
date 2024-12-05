import axios from "axios";
import { useUser } from "../context/UserContext";
import React, { useEffect, useState } from "react";

const BASE_URL = "http://localhost:3000";

function Orders() {
  const { user, setUser } = useUser();
  const [orders, setOrders] = useState([]);

  const fetchOrdersWithProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/user/${user.id}`);
      const orders = response.data;

      const ordersWithDetails = await Promise.all(
        orders.map(async (order) => {
          const itemsWithDetails = await Promise.all(
            order.items.map(async (item) => {
              const productResponse = await axios.get(
                `${BASE_URL}/products/${item.productId}`
              );
              return {
                ...item,
                productName: productResponse.data.name,
                productDescription: productResponse.data.description,
                productPrice: productResponse.data.price,
              };
            })
          );
          return { ...order, items: itemsWithDetails };
        })
      );

      setOrders(ordersWithDetails);
    } catch (error) {
      console.error("Error fetching orders or product details:", error);
    }
  };

  const handleMakePayment = async (orderId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/orders/${orderId}/payOrder`
      );
      const total = response.data.total;
      alert(`Payment of $${total} received!`);

      const updatedUser = { ...user, balance: user.balance - total };
      setUser(updatedUser);

      fetchOrdersWithProducts();
    } catch (error) {
      console.error("Error making payment:", error);
      alert("Failed to make payment.");
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.get(`${BASE_URL}/orders/${orderId}/cancelOrder`);
      alert("Order cancelled successfully.");
      fetchOrdersWithProducts();
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Failed to cancel order.");
    }
  };

  useEffect(() => {
    fetchOrdersWithProducts();
  }, [user.id]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6">
        {user.name}'s Orders
      </h1>
      {orders.length === 0 ? (
        <p className="text-gray-400 text-center">No orders found.</p>
      ) : (
        <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-6">
          {orders.map((order) => (
            <div key={order.id} className="mb-6">
              <h2 className="text-xl font-semibold text-cyan-300 mb-4">
                Order ID: {order.id}
              </h2>

              <table className="w-full text-gray-200">
                <thead>
                  <tr className="border-b border-gray-500">
                    <th className="py-3 text-left">Product</th>
                    <th className="py-3 text-left">Price</th>
                    <th className="py-3 text-left">Quantity</th>
                    <th className="py-3 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-500">
                      <td className="py-3 text-gray-300">{item.productName}</td>
                      <td className="py-3 text-gray-300">
                        ${item.productPrice.toFixed(2)}
                      </td>
                      <td className="py-3 text-gray-300">{item.quantity}</td>
                      <td className="py-3 text-gray-300">
                        ${(item.productPrice * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4">
                <p className="text-gray-300">Status: {order.status}</p>
                <p className="text-gray-300">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-2 text-xl font-semibold text-gray-300 text-right">
                  Total Cost: $
                  {order.items
                    .reduce(
                      (acc, item) => acc + item.productPrice * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </div>
              </div>

              {/* Add Make Payment and Cancel Order Buttons */}
              <div className="mt-4 flex justify-between">
                {order.status === "SHIPPING" && (
                  <>
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      onClick={() => handleMakePayment(order.id)}
                    >
                      Make Payment
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Cancel Order
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
