import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CourseContent.css'; // Import the CSS file

function CourseContent({ courseContent }) {
  const dispatch = useDispatch();
  const courseContentTitle = courseContent.title;
  const { viewedVideos } = useSelector(state => state.cabinetReducer.viewedVideos);
  
  useEffect(() => {
    dispatch({ type: 'CABINET_FETCH' });
  }, [dispatch]);
  console.log(courseContent.id, 'courseContent id')

  const hasViewed = viewedVideos?.some(video => video.courseContentId === courseContent.id);

  return (
    <div className="course-content">
      <li>
        <a
          href={courseContent.link}
          onClick={() =>
            dispatch({
              type: 'ADD_FETCH_VIEWED_VIDEOS',
              payload: { courseContentId: courseContent.id },
            })
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="course-title">
            {courseContentTitle}
            {hasViewed && <img src="/images/checkmark.png" className="check-mark" />}
          </p>
          <img
            src={`/${courseContent.picture}`}
            alt={courseContentTitle}
            className="course-image"
          />
        </a>
      </li>
    </div>
  );
}

export default CourseContent;
