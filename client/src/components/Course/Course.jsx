import React from 'react';
import { Link } from 'react-router-dom';
import './Course.css';

function Course({ course }) {
  const coursename = course.name;
  const id = course.id;
  const picture = course.picture;
  
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
    <div className="course-card">
      <Link to={`/categories/:categoryname/${coursename}/${id}`}>
        <li><h3>{course.name}</h3></li>
      </Link>
      <div id='course-description'><strong>Description:</strong> {coursename.description}</div>
      <img src={`/${picture}`} alt="" />
      <div className='star-container'>
        {generateStars(Math.round(course.averageRating))}
        <Link to={`/courseratingsreviews/${id}`}>
          <p className="ratings-paragraph">
            {course.ratingsCounter ? `${course.ratingsCounter} ratings` : 'No ratings yet'}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Course;
