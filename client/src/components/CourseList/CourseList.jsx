import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import Course from '../Course/Course';
import './CourseList.css';

function CourseList(props) {
  const courses = useSelector(state => state.coursesReducer.courses);
  const dispatch = useDispatch();
  const { categoryname, id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    dispatch({ type: 'GET_FETCH_COURSES', payload: { id } });
  }, [dispatch, id]);

  useEffect(() => {
    setFilteredCourses(
      courses && courses.length ?courses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      ): []
    );
  }, [courses, searchTerm]);

  return (
    <div>
      <h2>{categoryname}</h2>
      <input
        id = "course-search"
        type="text"
        placeholder="Search courses"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="course-list">
        {filteredCourses.length ? (
          filteredCourses.map(course => (
            <Course key={uuidv4()} course={course} />
          ))
        ) : (
          <li>No courses</li>
        )}
      </ul>
    </div>
  );
}

export default CourseList;
