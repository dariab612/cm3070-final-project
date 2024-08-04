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
  const [certifiedOnly, setCertifiedOnly] = useState(false);
  const [sortNewest, setSortNewest] = useState(false);

  useEffect(() => {
    dispatch({ type: 'GET_FETCH_COURSES', payload: { id } });
  }, [dispatch, id]);

  useEffect(() => {
    const filterCourses = () => {
      let filtered = courses || [];

      if (searchTerm) {
        filtered = filtered.filter(course =>
          course.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (certifiedOnly) {
        filtered = filtered.filter(course => course.certificate);
      }

      if (sortNewest) {
        filtered = filtered.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
      }

      setFilteredCourses(filtered);
    };

    filterCourses();
  }, [courses, searchTerm, certifiedOnly, sortNewest]);

  return (
    <div>
      <h2>{categoryname}</h2>
      <input
        id="course-search"
        type="text"
        placeholder="Search courses"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={certifiedOnly}
          onChange={(e) => setCertifiedOnly(e.target.checked)}
        />
        Certified only
      </label>
      <label>
        <input
          type="checkbox"
          checked={sortNewest}
          onChange={(e) => setSortNewest(e.target.checked)}
        />
        Newest first
      </label>
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
