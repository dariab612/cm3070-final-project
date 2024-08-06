import React, { useEffect } from 'react';
import MainHeader from '../MainHeader/MainHeader';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel } from './Carousel';
import './Home.css';

function Home(props) {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.coursesReducer.courses);

  useEffect(() => {
    dispatch({ type: 'GET_FETCH_ALL_COURSES' });
  }, [dispatch]);

  // Ensure courses is an array before attempting to filter
  const popularCourses = Array.isArray(courses) ? courses.filter(course => course.viewersCounter > 5) : [];
  const newCourses = Array.isArray(courses) ? courses.filter(course => {
    const courseDate = new Date(course.createdAt);
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    return courseDate >= fiveDaysAgo;
  }) : [];

  return (
    <div>
      <MainHeader />
      {popularCourses.length > 0 && (
        <>
          <h2>Popular Courses</h2>
          <Carousel courses={popularCourses} />
        </>
      )}
      {newCourses.length > 0 && (
        <>
          <h2>New Courses</h2>
          <Carousel courses={newCourses} />
        </>
      )}
    </div>
  );
}

export default Home;
