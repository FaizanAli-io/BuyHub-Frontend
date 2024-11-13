import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext"; // Ensure you have this context for user details

const BASE_URL = "http://localhost:3000";

function Orders() {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersWithProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/${user.id}/orders`);
        const orders = response.data;

        // Fetch product details for each item
        const ordersWithDetails = await Promise.all(
          orders.map(async (order) => {
            const itemsWithDetails = await Promise.all(
              order.items.map(async (item) => {
                const productResponse = await axios.get(`${BASE_URL}/products/${item.productId}`);
                return {
                  ...item,
                  productName: productResponse.data.name, // Assume the API returns `name`
                  productDescription: productResponse.data.description,
                  productPrice: productResponse.data.price, // Add price for total calculation
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
                    .reduce((acc, item) => acc + item.productPrice * item.quantity, 0)
                    .toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
