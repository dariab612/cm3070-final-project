import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import './CourseRatingsReviews.css';

function CourseRatingsReviews() {
  const courses = useSelector(state => state.coursesReducer.courses);
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const currentCourse = courses && courses.length ? courses.find(course => course.id === Number(courseId)) : null;
  console.log(courseId, 'courseId', courses)
  
  useEffect(() => {dispatch({ type: 'GET_FETCH_ALL_COURSES' })}, [dispatch])

  const [rating, setRating] = useState('5');

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch({ type: 'ADD_REVIEW_AND_RATING', payload: { courseId, rating,  } });
    } catch (error) {
      console.log('Error adding rating & review', error)
    }
  };

  return (
    <div className="course-ratings-reviews">
      {currentCourse ? (
        <div>
          <h2>{currentCourse.name}</h2>
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
            <button type="submit">Submit Rating</button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CourseRatingsReviews;

