import axios from "axios";
import React, { useState, useEffect } from "react";

const BASE_URL = "http://localhost:3000";

// Helper function to convert rating to stars
const renderStars = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(i < rating ? "★" : "☆");
  }
  return stars.join(" ");
};

function BuyerReviews({ userId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/reviews/user/${userId}`);
        setReviews(response.data.reverse().slice(0, 10));
      } catch (err) {
        setError("Error fetching reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [userId]);

  if (loading) {
    return <p className="text-center text-gray-300">Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (reviews.length === 0) {
    return <p className="text-center text-gray-300">No reviews available.</p>;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg mt-6">
      <h3 className="text-xl font-bold text-blue-400 mb-4">
        Your Latest Reviews
      </h3>
      <ul className="space-y-4">
        {reviews.map((review) => {
          const formattedDate = new Date(review.createdAt).toLocaleString();
          return (
            <li key={review.id} className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-300 font-semibold">
                {review.productName}
              </p>
              <p className="text-gray-500 text-sm">{formattedDate}</p>
              <p className="text-gray-300">{review.content}</p>
              <p className="text-yellow-400 text-sm">
                {renderStars(review.rating)}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BuyerReviews;
