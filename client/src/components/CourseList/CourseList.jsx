import React, { useEffect, useState, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
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

  function multiCriteriaSort(courses, certifiedOnly, sortNewest, sortPopular, sortFavourites) {
    return courses.sort((a, b) => {
      let scoreDiff = b.score - a.score;
      if (scoreDiff !== 0) return scoreDiff;

      if (certifiedOnly) {
        if (a.isCertified && !b.isCertified) return -1;
        if (!a.isCertified && b.isCertified) return 1;
      }

      if (sortNewest) {
        let dateDiff = new Date(b.createdAt) - new Date(a.createdAt);
        if (dateDiff !== 0) return dateDiff;
      }

      if (sortPopular) {
        let viewersDiff = b.viewersCounter - a.viewersCounter;
        if (viewersDiff !== 0) return viewersDiff;
      }

      if (sortFavourites && a.ratingsCounter >= 5 && b.ratingsCounter >= 5) {
        return b.averageRating - a.averageRating;
      }

      return a.id - b.id; // Fallback to default by ID if all else is equal
    });
  }

  useEffect(() => {
    const filterAndSortCourses = () => {
      if (!Array.isArray(courses)) {
        console.warn('Courses data is not an array', courses);
        setFilteredCourses([]);
        return;
      }

      let filtered = getRecommendationScores([...courses], session.telephone);

      filtered = multiCriteriaSort(filtered, certifiedOnly, sortNewest, sortPopular, sortFavourites);

      setFilteredCourses(filtered);
      forceUpdate(); // Force a re-render to update the UI
    };

    filterAndSortCourses();
  }, [courses, session.telephone, certifiedOnly, sortNewest, sortPopular, sortFavourites]);

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
          filteredCourses.map(course => (
            <Course key={uuidv4()} course={course} />
          ))
        ) : (
          <li>No courses found.</li>
        )}
      </ul>
    </div>
  );
}

export default CourseList;
