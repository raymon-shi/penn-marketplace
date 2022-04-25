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

  function findAverageRating() {
    const sum = reviews.reduce((acc, curr) => acc + Number(curr.reviewRating), 0);
    return sum / reviews.length;
  }

  return (
    <div>
      <div style={{ width: '100%' }}>
        <h1>Reviews - Average Rating: {findAverageRating()}</h1>
      </div>
      {reviews.length === 0 ? <div>You have no reviews.</div>
        : (
          <div id="reviews">
            <div style={{ padding: '1% 2%' }}>
              {reviews.map((review) => (
                <div className="review" key={review.authorEmail}>
                  <div style={{ margin: '1%' }}>
                    <div className="flex">
                      <div className="rating">
                        {generateRatingComponent(review.reviewRating)}
                      </div>
                      &nbsp;
                      {review.authorName}
                    </div>
                    <div>
                      {review.reviewContent}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default Reviews;
