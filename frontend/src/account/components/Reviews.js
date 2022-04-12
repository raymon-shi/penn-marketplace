import React from 'react';
import '../assets/Reviews.css';
import GrayStar from '../assets/gray-star.png';
import YellowStar from '../assets/yellow-star.png';

const Reviews = ({ reviews }) => {
  function generateRatingComponent(numStars) {
    const stars = Array(5).fill(<img src={GrayStar} alt="Yellow star." />);
    for (let i = 0; i < numStars; i += 1) {
      stars[i] = (<img src={YellowStar} alt="Yellow star." />);
    }
    return stars;
  }

  return (
    <div>
      <div style={{ width: '100%' }}>
        <h1>Reviews</h1>
      </div>
      <div id="reviews">
        <div style={{ padding: '1% 2%' }}>
          {reviews.map((review) => (
            <div className="review" key={review.author.id}>
              <div style={{ margin: '1%' }}>
                <div className="flex">
                  <div className="rating">
                    {generateRatingComponent(review.reviewRating)}
                  </div>
                  &nbsp;
                  {review.author}
                </div>
                <div>
                  {review.reviewContent}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
