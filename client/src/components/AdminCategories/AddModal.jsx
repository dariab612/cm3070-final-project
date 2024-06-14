import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


function AddModal() {
  const name1 = 'Category name'
  const picture1 = 'Picture name'

  const dispatch = useDispatch()
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');

  function nameChange({ target: { value } }) {
    setName(value)
  }
  function pictureChange({ target: { value } }) {
    setPicture(value)
  }

  function addCategoryFunc(event) {
    event.preventDefault()
    const name = event.target.categoryName.value
    const pictureName = event.target.categoryPictureName.value
    dispatch({ type: 'ADD_FETCH_CATEGORY', payload: { name, pictureName } })
    setName('')
    setPicture('')

    alert('Successfully added category');
  }

  return (
    <div>
       <form onSubmit={addCategoryFunc}>
      <input value={name} type="text" onChange={nameChange} placeholder={name1} name='categoryName'/>
      <br />
      <input value={picture} onChange={pictureChange} placeholder={picture1} name='categoryPictureName'></input>
      <br />
      <button type='submit'>Save category</button>
    </form>
    </div>
  );
}

export default AddModal;
