import React from "react";
import { useUser } from "../context/UserContext";
import { FaShoppingBag } from "react-icons/fa"; // E-commerce-related icon

function Profile() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <p className="text-2xl text-gray-100">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Art Design Section */}
      <div className="relative h-64 overflow-hidden bg-gray-900">
        {/* Background Art Design */}
        <div className="absolute inset-0">
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <polygon
              points="0,160 400,80 800,160 1200,80 1440,160 1440,320 0,320"
              fill="#1e3a8a"
            />
            <polygon
              points="0,200 400,120 800,200 1200,120 1440,200 1440,320 0,320"
              fill="#2563eb"
              fillOpacity="0.7"
            />
            <polygon
              points="0,240 400,160 800,240 1200,160 1440,240 1440,320 0,320"
              fill="#60a5fa"
              fillOpacity="0.5"
            />
          </svg>
        </div>

        {/* Icon Section */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-32 h-32 bg-gray-800 rounded-full border-4 border-gray-700 flex items-center justify-center shadow-lg">
            <FaShoppingBag className="text-blue-400 text-5xl" />
          </div>
        </div>
      </div>

      {/* User Info Section */}
      <div className="max-w-4xl mx-auto bg-gray-800 text-gray-300 shadow-lg rounded-lg p-8 mt-16">
        <h2 className="text-3xl font-bold text-center text-blue-400">
          {user.name}
        </h2>
        <p className="text-center text-gray-400 mb-4">{user.role}</p>
        <div className="grid grid-cols-1 gap-y-4 text-lg">
          <p>
            <strong className="text-gray-500">ID:</strong> {user.id}
          </p>
          <p>
            <strong className="text-gray-500">Email:</strong> {user.email}
          </p>
          <p>
            <strong className="text-gray-500">Created At:</strong>{" "}
            {new Date(user.createdAt).toLocaleString()}
          </p>
          <p>
            <strong className="text-gray-500">Updated At:</strong>{" "}
            {new Date(user.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
