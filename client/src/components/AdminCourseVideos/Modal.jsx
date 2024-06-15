import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


function Modal(props) {
  const title1 = props.title
  const link1 = props.link
  const id = props.id
  const course1 = props.courseName

  const dispatch = useDispatch()
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [course, setCourse] = useState('');

  function titleChange({ target: { value } }) {
    setTitle(value)
  }
  function linkChange({ target: { value } }) {
    setLink(value)
  }

  function courseChange({ target: { value } }) {
    setCourse(value)
  }

  function editCourseVideoFunc(event) {
    event.preventDefault()
    const title = event.target.courseVideoTitle.value
    const link = event.target.courseVideoLink.value
    const courseName = event.target.courseName.value
    dispatch({ type: 'EDIT_FETCH_COURSE_VIDEO', payload: { id, title, link, courseName  } })
    setTitle('')
    setLink('')
    setCourse('')

    alert('Successfully edited course video');
  }

  return (
    <div>
       <form onSubmit={editCourseVideoFunc}>
      <input value={title} type="text" onChange={titleChange} placeholder={title1} name='courseVideoTitle'/>
      <br />
      <input value={link} onChange={linkChange} placeholder={link1} name='courseVideoLink'></input>
      <br />
      <input value={course} onChange={courseChange} placeholder={course1} name='courseName'></input>
      <br />
      <button type='submit'>Edit course video</button>
    </form>
    </div>
  );
}

export default Modal;
