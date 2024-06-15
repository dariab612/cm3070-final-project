import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


function AddModal() {
  const title1 = 'Course Video title'
  const link1 = 'Course Video link'
  const course1 = 'Course name'

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

  function addCourseFunc(event) {
    event.preventDefault()
    const title = event.target.courseVideoTitle.value
    const link = event.target.courseVideoLink.value
    const courseName = event.target.courseName.value

    dispatch({ type: 'ADD_FETCH_COURSE_VIDEO', payload: { title, link, courseName } })
    setTitle('')
    setLink('')
    setCourse('')

    alert('Successfully added course video');
  }

  return (
    <div>
       <form onSubmit={addCourseFunc}>
      <input value={title} type="text" onChange={titleChange} placeholder={title1} name='courseVideoTitle'/>
      <br />
      <input value={link} onChange={linkChange} placeholder={link1} name='courseVideoLink'></input>
      <br />
      <input value={course} onChange={courseChange} placeholder={course1} name='courseName'></input>
      <br />
      <button type='submit'>Save Course Video</button>
    </form>
    </div>
  );
}

export default AddModal;
