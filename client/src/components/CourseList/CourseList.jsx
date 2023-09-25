import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
// // import { fetchCategoriesAC } from '../../redux/actionCreators/categoriesAC';
import Course from '../Course/Course';
import { useDispatch } from 'react-redux';

function CourseList(props) {
  const courses = useSelector(state => state.coursesReducer.courses)
  const dispatch = useDispatch()
  const categoryname = useParams().categoryname
  const { id } = useParams()
  useEffect(() => {
    dispatch({ type: 'GET_FETCH_COURSES', payload: { id } })
  }, [dispatch])
  return (
    <div>
      <h2>{categoryname}</h2>
      <ul className="course-list">
        {courses.length ? courses.map((course) => <Course key={uuidv4()} course={course} />) : <li>No courses</li>}
      </ul>
    </div>
  );
}

export default CourseList;
