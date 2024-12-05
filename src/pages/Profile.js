import axios from "axios";
import React, { useState, useEffect } from "react";

import { useUser } from "../context/UserContext";
import UserProfile from "../components/profile/UserProfile";
import BuyerReviews from "../components/profile/BuyerReviews";
import ProfileHeader from "../components/profile/ProfileHeader";
import AdminAnalytics from "../components/analytics/AdminAnalytics";
import BuyerAnalytics from "../components/analytics/BuyerAnalytics";
import SellerAnalytics from "../components/analytics/SellerAnalytics";

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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <ProfileHeader role={user.role} />

      <UserProfile user={user} />

      <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg p-8 mt-8">
        {loading && (
          <p className="text-center text-gray-300">Loading analytics...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {analytics && user.role === "BUYER" && (
          <>
            <BuyerAnalytics analytics={analytics} />
            <BuyerReviews userId={user.id} />
          </>
        )}

        {analytics && user.role === "SELLER" && (
          <SellerAnalytics analytics={analytics} />
        )}

        {analytics && user.role === "ADMIN" && (
          <AdminAnalytics analytics={analytics} />
        )}
      </div>
    </div>
  );
}

export default Profile;
