import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useFetchData } from '../hooks/useFetchData';
import { useUser } from "../context/UserContext";

const BASE_URL = "http://localhost:3000";

const ProductDetails = () => {
  const { user } = useUser();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, content: "" });

  // Fetch the user data using your custom hook
  // Assuming this endpoint fetches current logged-in user

  useEffect(() => {
    // Fetch product details
    const fetchProduct = async () => {
      try {
        const productResponse = await axios.get(`${BASE_URL}/products/${id}`);
        setProduct(productResponse.data);

        const reviewsResponse = await axios.get(`${BASE_URL}/reviews?productId=${id}`);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching product or reviews:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleReviewSubmit = async () => {
    if (!user) {
      alert("You must be logged in to submit a review.");
      return;
    }

    if (!newReview.content || !newReview.rating) {
      alert("Please provide both a rating and a review comment.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/reviews`, {
        userId: user.id,  // Use the dynamic user ID fetched from the API
        productId: id,     // Pass the current product ID
        rating: newReview.rating,
        content: newReview.content,
      });

      // Add the newly created review to the list
      setReviews((prevReviews) => [...prevReviews, response.data]);
      setNewReview({ rating: 0, content: "" }); // Reset the form
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-lg text-gray-400 my-4">{product.description}</p>
      <p className="text-lg">Price: ${product.price.toFixed(2)}</p>
      <p className="text-lg">Available: {product.quantity}</p>

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        {reviews.length > 0 ? (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li key={review.id} className="p-4 bg-gray-800 rounded-lg">
                <p className="text-lg font-semibold">Rating: {review.rating}/5</p>
                <p className="text-gray-300 mt-2">{review.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No reviews yet. Be the first to leave one!</p>
        )}
      </div>

      {/* Add Review Form */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Add a Review</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleReviewSubmit();
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="rating" className="block text-gray-400 mb-2">
              Rating (1-5):
            </label>
            <input
              type="number"
              id="rating"
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: Number(e.target.value) })
              }
              min="1"
              max="5"
              required
              className="p-2 rounded bg-gray-700 text-white w-full"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-gray-400 mb-2">
              Review Content:
            </label>
            <textarea
              id="content"
              value={newReview.content}
              onChange={(e) =>
                setNewReview({ ...newReview, content: e.target.value })
              }
              rows="4"
              required
              className="p-2 rounded bg-gray-700 text-white w-full"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
