import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


function Modal(props) {
  const name1 = props.name
  const picture1 = props.picture
  const id = props.id

  const dispatch = useDispatch()
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');

  function nameChange({ target: { value } }) {
    setName(value)
  }
  function pictureChange({ target: { value } }) {
    setPicture(value)
  }

  function editReviewFunc(event) {
    event.preventDefault()
    const name = event.target.categoryName.value
    const picture = event.target.pictureName.value
    dispatch( { type: 'EDIT_FETCH_CATEGORY', payload: { id: id, name: name, picture: picture } })
    setName('')
    setPicture('')

    alert('Successfully edited category');
  }

  return (
    <div>
       <form onSubmit={editReviewFunc}>
      <input value={name} type="text" onChange={nameChange} placeholder={name1} name='categoryName'/>
      <br />
      <input value={picture} onChange={pictureChange} placeholder={picture1} name='pictureName'></input>
      <br />
      <button type='submit'>Edit category</button>
    </form>
    </div>
  );
}

export default Modal;
