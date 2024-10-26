import React, { useState } from 'react';

function RatingStars() {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div className="rating-stars">
      {[...Array(5)].map((star, index) => (
        <span
          key={index}
          className={`star ${index < rating ? 'filled' : ''}`}
          onClick={() => handleRating(index + 1)}
        >
          ★
        </span>
      ))}
      <p>{rating} out of 5 stars</p>
    </div>
  );
}

export default RatingStars;
