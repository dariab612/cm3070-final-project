import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import CourseContent from '../CourseContent/CourseContent';
import './CourseContentList.css';

function CourseContentList() {
  const courses = useSelector(state => state.coursesReducer.courses);
  const courseContentList = useSelector(state => state.courseContentListReducer.courseContentList);
  const { viewedVideos } = useSelector(state => state.cabinetReducer.viewedVideos);

  const dispatch = useDispatch();
  const { id } = useParams();
  const [certificatePath, setCertificatePath] = useState(null);

  const currentCourse = courses && courses.length ? courses.find(course => course.id === Number(id)) : null;

  useEffect(() => {
    dispatch({ type: 'GET_FETCH_COURSE_CONTENT_LIST', payload: { id } });
  }, [dispatch, id]);

  let matchingCourseTitle = currentCourse ? currentCourse.name : null;

  const viewedVideosBoolArray = [];
  const viewedVideosArray = [];

  if (courseContentList && courseContentList.length) {
    for (const courseContent of courseContentList) {
      let viewedCourseContent = viewedVideos && viewedVideos.length ? viewedVideos.find(video => video.courseContentId === courseContent.id) : null;
      if (viewedCourseContent) {
        viewedVideosBoolArray.push(true);
        viewedVideosArray.push(viewedCourseContent);
      } else {
        viewedVideosBoolArray.push(false);
      }
    }
  }

  let notWatchedVideo = viewedVideosBoolArray.find(viewedVideoBoolean => viewedVideoBoolean === false);
  let allowCertificate = false;

  const finishedViewedVideosArray = [];
  if (!notWatchedVideo) {
    for (const viewedVideo of viewedVideosArray) {
      if (viewedVideo.maxPlayedSeconds) {
        if (viewedVideo.maxPlayedSeconds >= viewedVideo.totalSeconds * 0.85) {
          finishedViewedVideosArray.push(true);
        } else {
          finishedViewedVideosArray.push(false);
        }
      } else {
        finishedViewedVideosArray.push(false);
      }
    }
  }

  let noFinishedViewedVideo = finishedViewedVideosArray.find(viewedVideoBoolean => viewedVideoBoolean === false);
  if (noFinishedViewedVideo === undefined) {
    allowCertificate = true;
  }

  function onClickHandler(event) {
    event.preventDefault();
    console.log('Button clicked'); // Debugging line
    dispatch({ type: 'CREATE_CERTIFICATE', payload: { courseId: id }});
    if (currentCourse && currentCourse.certificate) {
      setCertificatePath(currentCourse.certificate);
    }
  }

  function onClickHandler2(event) {
    event.preventDefault();
    console.log('Button clicked 2'); // Debugging line
  }

  return (
    <div>
      {matchingCourseTitle ? <h3 id="course-title">{matchingCourseTitle}</h3> : <p>No matching course found</p>}
      <ul>
        {courseContentList.length ? courseContentList.map((courseContent) =>
          <CourseContent key={courseContent.id} courseContent={courseContent} />) : <li>No course content</li>}
      </ul>
      { allowCertificate && (
        <button type="button" onClick={onClickHandler}>Click to receive certificate</button>
      )}
      {certificatePath && (
        <div>
          <p>Click the link below to download your certificate:</p>
          <a href={certificatePath} download>Download Certificate</a>
        </div>
      )}

    <button type="button" onClick={onClickHandler2}>Click to receive certificate</button>
    </div>
  );
}

export default CourseContentList;
