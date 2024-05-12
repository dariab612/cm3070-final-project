import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CourseContent.css';
import ReactPlayer from 'react-player'

function CourseContent({ courseContent }) {
  const dispatch = useDispatch();
  const courseContentTitle = courseContent.title;
  const { viewedVideos } = useSelector(state => state.cabinetReducer.viewedVideos);
  console.log(viewedVideos, 'viewedVideos')
  const [progress, setProgress] = useState(0);
  const [maxProgress, setMaxProgress] = useState(0);
  console.log('PROGRESS:',progress)

  useEffect(() => {
    dispatch({ type: 'CABINET_FETCH' });
  }, [dispatch]);

  const hasViewed = viewedVideos?.some(video => video.courseContentId === courseContent.id);

  const handleProgress = (progress) => {
    setProgress(prevProgress => {
      console.log('22')
      if (Math.abs(progress.playedSeconds - prevProgress) >= 8) {
        console.log('24')
        dispatch({ type: 'UPDATE_VIEWED_VIDEO_PROGRESS', payload: { courseContentId: courseContent.id, progress: progress.playedSeconds } });
        return progress.playedSeconds;
      }
      return prevProgress;
    })

    setMaxProgress(prevProgress => {
      console.log('32')
      if (maxProgress.maxPlayedSeconds - prevProgress >= 8) {
        console.log('34')
        dispatch({ type: 'UPDATE_VIEWED_VIDEO_MAX_PROGRESS', payload: { courseContentId: courseContent.id, maxProgress: maxProgress.maxPlayedSeconds } });
        return maxProgress.maxPlayedSeconds;
      }
      return prevProgress;
    })
  }
  const playerRef = React.useRef();

  const onReady = React.useCallback(() => {
    const videoProgressed = viewedVideos.find(video => video.courseContentId === courseContent.id);
    const timeToStart = videoProgressed.playedSeconds;
    console.log(timeToStart, timeToStart)
    playerRef.current.seekTo(timeToStart, 'seconds');
  }, [playerRef.current, viewedVideos]);

  return (
    <div className="course-content">
      <li>
        <div className="video-container">
          <ReactPlayer  url={courseContent.link}
            ref={playerRef}
            onProgress={handleProgress}
            onReady={onReady}
            width = '600'
            controls={true}
          />
        </div>
        <div>
          <p className="course-title">
            {courseContentTitle}
            {hasViewed && <img src="/images/checkmark.png" className="check-mark" />}
          </p>
        </div>
      </li>
    </div>
  );
}

export default CourseContent;
