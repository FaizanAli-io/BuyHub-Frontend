import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useUser } from "../context/UserContext";
import BuyerAnalytics from "../components/analytics/BuyerAnalytics";
import SellerAnalytics from "../components/analytics/SellerAnalytics";
import AdminAnalytics from "../components/analytics/AdminAnalytics";

const BASE_URL = "http://localhost:3000";

function Profile() {
  const { user } = useUser();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user) return;

      try {
        let response;
        setLoading(true);

        if (user.role === "BUYER") {
          response = await axios.get(`${BASE_URL}/analytics/buyer/${user.id}`);
        } else if (user.role === "SELLER") {
          response = await axios.get(`${BASE_URL}/analytics/seller/${user.id}`);
        } else if (user.role === "ADMIN") {
          response = await axios.get(`${BASE_URL}/analytics/admin/`);
        }

        setAnalytics(response.data);
      } catch (err) {
        setError("Error fetching analytics data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <p className="text-2xl text-gray-100">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  const formattedCreatedAt = new Date(user.createdAt).toLocaleString();
  const formattedUpdatedAt = new Date(user.updatedAt).toLocaleString();
  const hiddenDate = "10/27/2024, 3:37:01 AM";

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
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
      <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg p-8 mt-16">
        <h2 className="text-4xl font-extrabold text-center text-blue-400 mb-2">
          {user.name}
        </h2>
        <p className="text-center text-gray-400 mb-8 text-lg italic">
          {user.role}
        </p>

        {/* Profile info */}
        <div className="grid grid-cols-1 gap-y-6 text-lg">
          <p className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-all">
            <strong className="block text-gray-400 uppercase text-sm">
              Email
            </strong>
            <span className="text-gray-300">{user.email}</span>
          </p>
          {formattedCreatedAt !== hiddenDate && (
            <p className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-all">
              <strong className="block text-gray-400 uppercase text-sm">
                Joined On
              </strong>
              <span className="text-gray-300">{formattedCreatedAt}</span>
            </p>
          )}
          {formattedUpdatedAt !== hiddenDate && (
            <p className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-all">
              <strong className="block text-gray-400 uppercase text-sm">
                Last Updated
              </strong>
              <span className="text-gray-300">{formattedUpdatedAt}</span>
            </p>
          )}

          {/* Analytics Section */}
          {loading && (
            <p className="text-center text-gray-300">Loading analytics...</p>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}

          {/* Render appropriate analytics component */}
          {analytics && user.role === "BUYER" && (
            <BuyerAnalytics analytics={analytics} />
          )}

          {analytics && user.role === "SELLER" && (
            <SellerAnalytics analytics={analytics} />
          )}

          {/* Render Admin Analytics if the user is an Admin */}
          {analytics && user.role === "ADMIN" && (
            <AdminAnalytics analytics={analytics} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
