import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';
import ReactPlayer from 'react-player'

function AdminCourseVideos({ id, title, link, courseId }) {
  const dispatch = useDispatch()
  const courses = useSelector((state) => state.coursesReducer.courses)
  useEffect(() => {dispatch({ type: 'GET_FETCH_ALL_COURSES' })}, [dispatch])
  const [ modal, setModal ] = useState(false)

  const course = courses && courses.length ? courses.find(course => course.id === courseId) : ''
  return (
    <>
    <div>
        <h3>{title}</h3>
        <div className="video-container">
          <ReactPlayer  url={link}
            width = '600'
            controls={true}
          />
        </div>
        <button onClick={() => dispatch({ type: 'DELETE_FETCH_COURSE_VIDEO', payload: { id } })}>Delete course video</button>
        <button onClick={() => setModal(!modal)}>Edit course video</button>
        { modal && <Modal id={id} title={title} link={link} courseName={course.name}/> }
    </div>
    </>
  )
}

export default AdminCourseVideos;
