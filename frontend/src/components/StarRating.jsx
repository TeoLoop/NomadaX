import React, { useId } from "react";
import '../styles/StarRating.css';

const StarRating = ({ value }) => {
  const uniqueId = useId();
  const fullStars = Math.floor(value);
  const hasHalfStar = Math.round(value - fullStars) === 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={`full-${uniqueId}-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          className="full"
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 7.568L24 9.75l-6 5.849L19.335 24 12 20.018 4.665 24 6 15.599 0 9.75l8.332-1.595z" />
        </svg>
      ))}

      {/* Media estrella */}
      {hasHalfStar && (
        <svg
          key={`half-${uniqueId}`}
          xmlns="http://www.w3.org/2000/svg"
          className="half"
          viewBox="0 0 24 24"
        >
          <defs>
            <linearGradient id={`halfGrad-${uniqueId}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="lightgray" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#halfGrad-${uniqueId})`}
            d="M12 .587l3.668 7.568L24 9.75l-6 5.849L19.335 24 12 20.018 4.665 24 6 15.599 0 9.75l8.332-1.595z"
          />
        </svg>
      )}

      {[...Array(emptyStars)].map((_, i) => (
        <svg
          key={`empty-${uniqueId}-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          className="empty"
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 7.568L24 9.75l-6 5.849L19.335 24 12 20.018 4.665 24 6 15.599 0 9.75l8.332-1.595z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
