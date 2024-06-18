import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { initReviewsAC } from '../../redux/actionCreators/reviewsAC/reviewsAC';
import AddReviewForm from './AddReviewForm';
import ReviewCard from './ReviewCard';

import './Review.css';


function Review(props) {
  const [newDate, setNewDate] = useState('')

  const dispatch = useDispatch()
  const { reviews } = useSelector(state => state.reviewsReducer)

  let newReviews = []
  if (reviews && reviews.length) {
    newReviews = reviews.filter((el) => el.isValid !== false)
  }

  useEffect(() => {
    dispatch({ type: 'GET_FETCH_REVIEW' });
  }, [dispatch]);

  return (
    <div className="review-block">
      <h2>Reviews</h2>
      <div className="review-body">
        {newReviews.length ? newReviews.map(review => 
        {
          console.log('review', review)
        return <ReviewCard key={review.id} name={review.name} text={review.text} id={review.id} isValid={review.isValid} />
        }): <p>No reviews</p>}
      </div>
      <AddReviewForm />
    </div>
  );
}

export default Review;
