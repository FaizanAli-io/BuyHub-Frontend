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
            <div key={order.id} className="mb-4 border-b border-gray-600 pb-4">
              <h2 className="text-xl font-semibold text-cyan-300">
                Products:{" "}
                {order.items.map((item, index) => (
                  <span key={item.id}>
                    {item.productName}
                    {index < order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </h2>
              <p className="text-gray-300">Status: {order.status}</p>
              <p className="text-gray-300">Total: ${order.total.toFixed(2)}</p>
              <p className="text-gray-300">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <h3 className="text-lg font-bold text-gray-200 mt-2">Items:</h3>
              <ul className="list-disc list-inside">
                {order.items.map((item) => (
                  <li key={item.id} className="text-gray-300">
                    Product: {item.productName} - {item.productDescription},
                    Quantity: {item.quantity},
                    Price: ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
