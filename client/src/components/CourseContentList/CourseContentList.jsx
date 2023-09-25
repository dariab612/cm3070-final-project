import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import CourseContent from '../CourseContent/CourseContent';
import './CourseContentList.css';

function CourseContentList() {
  const courses = useSelector(state => state.coursesReducer.courses);
  const courseContentList = useSelector(state => state.courseContentListReducer.courseContentList);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'GET_FETCH_COURSE_CONTENT_LIST', payload: { id } });
  }, [dispatch, id]);

  let matchingCourseTitle = null;

  return (
    <div>
      {courseContentList.length ? courseContentList.map(courseContent => {
        const matchingCourse = courses[courseContent.courseId - 1];
        if (matchingCourse) {
          matchingCourseTitle = matchingCourse.name;
          return null;
        }
        return null;
      }) : null}
      {matchingCourseTitle ? <h3 id="course-title">{matchingCourseTitle}</h3> : <p>No matching course found</p>}
      <ul>
        {courseContentList.length ? courseContentList.map((courseContent) =>
          <CourseContent key={courseContent.id} courseContent={courseContent} />) : <li>No course content</li>}
      </ul>
    </div>
  );
}

export default CourseContentList;

