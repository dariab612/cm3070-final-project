import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import './CourseRatingsReviews.css';

function CourseRatingsReviews() {
  const courses = useSelector(state => state.coursesReducer.courses);
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const currentCourse = courses && courses.length ? courses.find(course => course.id === Number(courseId)) : null;

  const clients = useSelector(state => state.clientsReducer.clients);

  useEffect(() => {
    dispatch({ type: 'GET_FETCH_ALL_COURSES' });
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: 'GET_FETCH_ALL_CLIENTS' });
  }, [dispatch]);

  const [rating, setRating] = useState('5');
  const [review, setReview] = useState('');

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch({ type: 'ADD_REVIEW_AND_RATING', payload: { courseId, rating, review } });
      alert('Your rating & review are correctly added.');
    } catch (error) {
      console.log('Error adding rating & review', error);
    }
  };

  const generateStars = (rating) => {
    let starsArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        starsArray.push(<span key={i} className='star-inner'>&#9733;</span>);
      } else {
        starsArray.push(<span key={i} className='star-outer'>&#9733;</span>);
      }
    }
    return starsArray;
  };

  return (
    <div className="course-ratings-reviews">
      {currentCourse ? (
        <div>
          <div className="courseInfo">
            <div className="imageContainer">
              <img src={`/${currentCourse.picture}`} alt="" />
            </div>
            <div className="headerContainer">
              <h2 id="course-header-rating-and-reviews-page">{currentCourse.name}</h2>
              <div id="star-container">
                {generateStars(Math.round(currentCourse.averageRating))}
                <p id="average-rating">
                  {currentCourse.averageRating ? `${currentCourse.averageRating} stars` : ''}
                </p>
              </div>
              <p id="ratings-paragraph">
                {currentCourse.ratingsCounter
                  ? currentCourse.ratingsCounter === 1
                    ? `${currentCourse.ratingsCounter} rating`
                    : `${currentCourse.ratingsCounter} ratings`
                  : 'No ratings yet'}
              </p>
              <p id="course-description">
                {currentCourse.description}
              </p>
            </div>
          </div>

          <h3 className="form-header">What do you think?</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Rating:
              <select value={rating} onChange={handleRatingChange}>
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very Good</option>
                <option value="3">3 - Good</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>
            </label>
            <label>
              Review:
              <textarea
                value={review}
                onChange={handleReviewChange}
                placeholder="Write your review here..."
              />
            </label>
            <button type="submit">Submit Rating & Review</button>
          </form>

          {clients && Array.isArray(clients) && Object.keys(currentCourse.reviews).length > 0 && (
            <div className="reviews-section">
              <h3>Reviews</h3>
              {Object.entries(currentCourse.reviews).map(([user, userReview]) => {
                const client = clients.find(client => client.telephone === user);
                const login = client ? client.login : 'Unknown User';
                return (
                  <div key={user} className="review">
                    <div className="review-rating">
                      {generateStars(currentCourse.ratings[user])}
                    </div>
                    <div className="review-details">
                      <p className="review-login">{login}</p>
                      <p className="review-text">{userReview}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CourseRatingsReviews;
