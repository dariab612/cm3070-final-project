import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


function AddModal() {
  const name1 = 'Course name'
  const picture1 = 'Picture name'
  const category1 = 'Category name'
  const description1 = 'Description'

  const dispatch = useDispatch()
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  function nameChange({ target: { value } }) {
    setName(value)
  }
  function pictureChange({ target: { value } }) {
    setPicture(value)
  }

  function categoryChange({ target: { value } }) {
    setCategory(value)
  }

  function descriptionChange({ target: { value } }) {
    setDescription(value)
  }

  function addCourseFunc(event) {
    event.preventDefault()
    const name = event.target.courseName.value
    const pictureName = event.target.coursePictureName.value
    const categoryName = event.target.categoryName.value
    const description = event.target.categoryName.value

    dispatch({ type: 'ADD_FETCH_COURSE', payload: { name, pictureName, categoryName, description } })
    setName('')
    setPicture('')
    setCategory('')
    setDescription('')

    alert('Successfully added course');
  }

  return (
    <div>
       <form onSubmit={addCourseFunc}>
      <input value={name} type="text" onChange={nameChange} placeholder={name1} name='courseName'/>
      <br />
      <input value={picture} onChange={pictureChange} placeholder={picture1} name='coursePictureName'></input>
      <br />
      <input value={category} onChange={categoryChange} placeholder={category1} name='categoryName'></input>
      <br />
      <input value={description} onChange={descriptionChange} placeholder={description1} name='description'></input>
      <br />
      <button type='submit'>Save course</button>
    </form>
    </div>
  );
}

export default AddModal;
