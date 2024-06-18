import React from 'react';
import { Link } from 'react-router-dom';
// import { getFetchMastersAC } from '../../redux/actionCreators/mastersAC';

import './Course.css';

function Course({ course }) {
  const coursename = course.name
  const id = course.id
  const picture = course.picture
  return (
    <div className="course-card">
      <Link to={`/categories/:categoryname/${coursename}/${id}`}>
      <li><h3>{course.name}</h3></li>
      </Link>
      <div id='course-description'><strong>Description:</strong> {coursename.description}</div>
      <img src={`/${picture}`} alt="" />
    </div>
  );
}

export default Course;
