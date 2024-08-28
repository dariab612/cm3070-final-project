import React, { useEffect, useState, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Course from '../Course/Course';
import './CourseList.css';

function CourseList() {
  const courses = useSelector(state => state.coursesReducer.courses);
  const dispatch = useDispatch();
  const { session } = useSelector((state) => state.sessionReducer);
  const { categoryname, id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [certifiedOnly, setCertifiedOnly] = useState(false);
  const [sortNewest, setSortNewest] = useState(false);
  const [sortPopular, setSortPopular] = useState(false);
  const [sortFavourites, setSortFavourites] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    dispatch({ type: 'GET_FETCH_COURSES', payload: { id } });
  }, [dispatch, id]);

  function useForceUpdate() {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    return forceUpdate;
  }

  const forceUpdate = useForceUpdate();

  function getRecommendationScores(courses, userTelephone) {
    const userViewedCourses = courses.filter(course => course.viewers.includes(userTelephone));
    const similarUserViewedCourses = courses.filter(course => 
      course.viewers.some(phone => userViewedCourses.flatMap(c => c.viewers).includes(phone))
    );

    return courses.map(course => ({
      ...course,
      score: (
        (course.viewers.includes(userTelephone) ? 10 : 0) +
        (similarUserViewedCourses.includes(course) ? 5 : 0) +
        (course.averageRating > 4 ? 5 : 0) +
        (course.ratingsCounter > 10 ? 3 : 0)
      )
    }));
  }

  function multiCriteriaSort(courses) {
    return courses.sort((a, b) => {
      if (sortPopular) {
        return b.viewersCounter - a.viewersCounter;
      }

      if (sortNewest) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      if (sortFavourites && a.ratingsCounter >= 5 && b.ratingsCounter >= 5) {
        return b.averageRating - a.averageRating;
      }

      return a.id - b.id;
    });
  }

  useEffect(() => {
    const filterAndSortCourses = () => {
      if (!Array.isArray(courses)) {
        setFilteredCourses([]);
        return;
      }

      let filtered = getRecommendationScores([...courses], session.telephone);

      if (certifiedOnly) {
        filtered = filtered.filter(course => course.isCertified);
      }

      filtered = multiCriteriaSort(filtered);
      setFilteredCourses(filtered);
      forceUpdate();
    };

    filterAndSortCourses();
  }, [courses, session.telephone, certifiedOnly, sortNewest, sortPopular, sortFavourites]);

  const colorPalette = [
    '#DEC7DC',
    '#DEC7C7',
    '#E7BBD0',
    '#F1B4D5',
    '#EAB8B8',
  ];

  return (
    <div>
      <h2>&#10083; {categoryname} &#10083;</h2>
      <div className="filters-container">
        <input
          id="course-search"
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={`menu-button ${filtersOpen ? 'open' : ''}`} onClick={() => setFiltersOpen(!filtersOpen)}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </button>
        <Link to="/categories" className="go-back-button">
          &larr; Back to Categories
        </Link>
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
          <label>
            <input
              type="checkbox"
              checked={sortPopular}
              onChange={(e) => setSortPopular(e.target.checked)}
            />
            Popular
          </label>
          <label>
            <input
              type="checkbox"
              checked={sortFavourites}
              onChange={(e) => setSortFavourites(e.target.checked)}
            />
            Favourites
          </label>
        </div>
      )}
      <ul className="course-list">
        {filteredCourses.length ? (
          filteredCourses.map((course, index) => (
            <Course key={uuidv4()} course={course} color={colorPalette[index % colorPalette.length]} />
          ))
        ) : (
          <li>No courses found.</li>
        )}
      </ul>
    </div>
  );
}

export default CourseList;
