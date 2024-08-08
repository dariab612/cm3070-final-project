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

  const popularCourses = Array.isArray(courses) ? courses.filter(course => course.viewersCounter >= 5) : [];
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
        <div className="popular-courses-box">
          <h2><span className="flower-emoji">🤩</span> Popular Courses <span className="flower-emoji">🤩</span></h2>
          <Carousel courses={popularCourses} />
        </div>
      )}
      <div className='emtpy-block'></div>
      {newCourses.length > 0 && (
        <div className="new-courses-box">
          <h2>
            <span className="flower-emoji">&#127800;</span> New Courses <span className="flower-emoji">&#127800;</span>
          </h2>
          <Carousel courses={newCourses} />
        </div>
      )}
      <div className='emtpy-block'></div>
    </div>
  );
}

export default Home;
