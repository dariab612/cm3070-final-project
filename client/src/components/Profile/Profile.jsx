import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Profile.css'; // Import your CSS file for styling

function Profile(props) {
  const dispatch = useDispatch();
  const { viewedVideos, coursesContent } = useSelector(state => state.cabinetReducer.viewedVideos);
  useEffect(() => {
    dispatch({ type: 'CABINET_FETCH' });
  }, [dispatch]);

  const courseDataMap = viewedVideos.reduce((acc, el) => {
    const courseContent = coursesContent.find(content => content.id === el.courseContentId);
    if (courseContent) {
      const courseTitle = courseContent.courseTitle;
      const numberOfVideos = courseContent.numberOfVideos;
      const viewedVideoCount = courseContent.viewedVideoCount;
      const title = courseContent.title;

      let groupedCoursesContents = coursesContent.reduce((acc, courseContent) => {
        if (!acc[courseContent.courseId]) {
          acc[courseContent.courseId] = [];
        }
        acc[courseContent.courseId].push(courseContent);
        return acc;
      }, {});

      if (!acc[courseTitle]) {
        acc[courseTitle] = {
          numberOfVideos,
          viewedVideoCount,
          titles: [],
        };
      }
      if (!acc[courseTitle].titles.includes(title)) {
        acc[courseTitle].titles.push(title);
      }

      let totalProgress = 0;
      if (groupedCoursesContents[courseContent.courseId]) {
          groupedCoursesContents[courseContent.courseId].forEach(content => {
            totalProgress += (content.viewedVideosCourseContent && content.viewedVideosCourseContent.maxPlayedSeconds ? (content.viewedVideosCourseContent.maxPlayedSeconds / content.viewedVideosCourseContent.totalSeconds) * 100 : 0);
          });
          acc[courseTitle].percentage = (totalProgress / numberOfVideos).toFixed(2);
      }
    }

    return acc;
  }, {});

  return (
    <>
      <h3>Course Progress</h3>
      <div className="course-progress-container">
        {Object.entries(courseDataMap).length > 0 ? (
          Object.entries(courseDataMap).map(([courseTitle, { numberOfVideos, viewedVideoCount, titles, percentage }]) => {
            console.log(percentage, 'percentage')
            // const percentageViewed = (viewedVideoCount / numberOfVideos * 100).toFixed(2);
            // const displayedPercentage = Math.min(percentageViewed, 100); // Ensure it doesn't exceed 100
            
            return (
              <div key={courseTitle} className="course-details">
                <h2>{courseTitle}</h2>
                <p>Percentage Viewed: {percentage}%</p>
                <ul className="course-titles-list">
                  {titles.map((title, index) => (
                    <li key={index}>{title}</li>
                  ))}
                </ul>
              </div>
            );
          })
        ) : (
          <p className="no-reserv">There are no viewed courses! :</p>
        )}
      </div>
    </>
  );
}

export default Profile;

