import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import ReviewCardDelete from './ReviewCardDelete';
import './AdminReview.css';

function AdminReview(props) {
  const dispatch = useDispatch()
  const { reviews } = useSelector(state => state.reviewsReducer)
  const { session } = useSelector((state) => state.sessionReducer)

  let newReviews = []
  if (reviews && reviews.length) {
    newReviews = reviews.filter((el) => el.isValid !== false)
  }

  let falseReviews = []
  if(reviews && reviews.length) {
    falseReviews = reviews.filter((el) => el.isValid == false)
  }

  useEffect(() => {
    dispatch({ type: 'GET_FETCH_REVIEW' });
  }, [dispatch]);

  return (
    <div className="admin-reviews-block">
       { session && session.isAdmin ?
      <>
      <h2>Admin Reviews</h2>
      <div className="admin-menu">
        <Link to="/adminreview">Reviews</Link>
        <Link to="/adminchangepass">Change Password</Link>
      </div>
      <div className="admin-reviews">
        <ul>
          {newReviews.length ? newReviews.map(review => <ReviewCardDelete key={review.id} name={review.name} text={review.text} id={review.id} isValid={review.isValid} />) : <>No Reviews</>}
        </ul>
          <p>New reviews</p>
        <ul>
          {falseReviews.length ? falseReviews.map(review => <ReviewCardDelete key={review.id} name={review.name} text={review.text} id={review.id} isValid={review.isValid} />) : <>Empty</> }
        </ul>
      </div>
      </> :
        <>
          {console.log(session, 'session && session.isAdmin')}
          <div>Page not found</div>
        </>
      }
    </div>
  );
}

export default AdminReview;
