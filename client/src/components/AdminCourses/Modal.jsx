import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


function Modal(props) {
  const name1 = props.name
  const picture1 = props.picture
  const id = props.id
  const category1 = props.category
  const description1 = props.description

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


  function editCourseFunc(event) {
    event.preventDefault()
    const name = event.target.courseName.value
    const picture = event.target.pictureName.value
    const category = event.target.categoryName.value
    const description = event.target.description.value
    dispatch( { type: 'EDIT_FETCH_COURSE', payload: { id, name, pictureName: picture, categoryName: category,  description  } })
    setName('')
    setPicture('')

    alert('Successfully edited category');
  }

  return (
    <div>
       <form onSubmit={editCourseFunc}>
      <input value={name} type="text" onChange={nameChange} placeholder={`Course Name: ${name1}`} name='courseName'/>
      <br />
      <input value={picture} onChange={pictureChange} placeholder={`Picture Name: ${picture1}`} name='pictureName'></input>
      <br />
      <input value={category} onChange={categoryChange} placeholder={`Category Name: ${category1}`} name='categoryName'></input>
      <br />
      <textarea value={description} onChange={descriptionChange} placeholder={`Description: ${description1}`} name='description'></textarea>
      <br />
      <button type='submit'>Edit course</button>
    </form>
    </div>
  );
}

export default Modal;
