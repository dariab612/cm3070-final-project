import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CourseContent.css';
import ReactPlayer from 'react-player'

function CourseContent({ courseContent }) {
  const dispatch = useDispatch();
  const courseContentTitle = courseContent.title;
  const { viewedVideos } = useSelector(state => state.cabinetReducer.viewedVideos);
  const [progress, setProgress] = useState(0);
  const [maxProgress, setMaxProgress] = useState(0);

  useEffect(() => {
    dispatch({ type: 'CABINET_FETCH' });
  }, [dispatch]);

  const hasViewed = viewedVideos?.some(video => video.courseContentId === courseContent.id);

  let isStopped = false
  const handleProgress = (progress) => {
    setProgress(prevProgress => {
      if (Math.abs(progress.playedSeconds - prevProgress) >= 8) {
        dispatch({ type: 'UPDATE_VIEWED_VIDEO_PROGRESS', payload: { courseContentId: courseContent.id, progress: progress.playedSeconds } });
        return progress.playedSeconds;
      }
      return prevProgress;
  })

    setMaxProgress(prevProgress => {
      if ((progress.playedSeconds - prevProgress >= 8) || isStopped) {
        console.log(33)
        isStopped = false
        dispatch({ type: 'UPDATE_VIEWED_VIDEO_MAX_PROGRESS', payload: { courseContentId: courseContent.id, maxProgress: progress.playedSeconds } });
        return progress.playedSeconds;
      }
      return prevProgress;
    })
  }
  const playerRef = React.useRef();

  const onReady = React.useCallback(() => {
    const videoProgressed = viewedVideos.find(video => video.courseContentId === courseContent.id);
    const timeToStart = videoProgressed.playedSeconds;
    playerRef.current.seekTo(timeToStart, 'seconds');
  }, [playerRef.current, viewedVideos]);

  const handleDuration = (duration) => {
    dispatch({ type: 'UPDATE_VIEWED_VIDEO_TOTAL_SECONDS', payload: { courseContentId: courseContent.id, totalSeconds: duration } });
  }

  const onPause = () => {
    isStopped = true
  }

  const onStop = () => {
    isStopped = true
  }

  return (
    <div className="course-content" id="course-content-data">
      <li>
        <div className="video-container">
          <ReactPlayer  url={courseContent.link}
            ref={playerRef}
            onProgress={handleProgress}
            onDuration={handleDuration}
            onReady={onReady}
            onPause={onPause}
            onStop={onStop}
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
