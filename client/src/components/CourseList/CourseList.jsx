import React, { useEffect, useState, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import Course from '../Course/Course';
import './CourseList.css';

function CourseList() {
  const courses = useSelector(state => state.coursesReducer.courses);
  const dispatch = useDispatch();
  const { categoryname, id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [certifiedOnly, setCertifiedOnly] = useState(false);
  const [sortNewest, setSortNewest] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  console.log(courses, 'courses')
  useEffect(() => {
    dispatch({ type: 'GET_FETCH_COURSES', payload: { id } });
  }, [dispatch, id]);

  function useForceUpdate() {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    return forceUpdate;
  }

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const filterCourses = () => {
      let filtered = courses || [];
      console.log(sortNewest, 'sortNewest')
      if (filtered.length) {
        filtered = filtered.sort((a, b) => a.id - b.id); 
      }
    
      if (searchTerm) {
        filtered = filtered.filter(course =>
          course.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (certifiedOnly) {
        filtered = filtered.filter(course => course.isCertified);
      }

      if (sortNewest) {
        filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      setFilteredCourses(filtered);
    };

    filterCourses();

    forceUpdate();
  }, [courses, searchTerm, certifiedOnly, sortNewest]);

  return (
    <div>
      <h2>{categoryname}</h2>
      <div className="filters-container">
        <input
          id="course-search"
          type="text"
          placeholder="Search courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={`menu-button ${filtersOpen ? 'open' : ''}`} onClick={() => setFiltersOpen(!filtersOpen)}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </button>
      </div>
      {filtersOpen && (
        <div className="filters-menu">
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
        </div>
      )}
      <ul className="course-list">
        {filteredCourses.length ? (
          filteredCourses.map(course => {
            return <Course key={uuidv4()} course={course} />})
        ) : (
          <li>No courses</li>
        )}
      </ul>
    </div>
  );
}

export default CourseList;
