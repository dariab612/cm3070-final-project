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
    const name = event.target.clientReviewName.value
    const picture = event.target.newReviewValue.value
    dispatch( { type: 'EDIT_FETCH_CATEGORY', payload: { id: id, name: name, picture: picture } })
    setName('')
    setPicture('')

    alert('Successfully edited category');
  }

  return (
    <div>
       <form onSubmit={editReviewFunc}>
      <input value={name} type="text" onChange={nameChange} placeholder={name1} name='clientReviewName'/>
      <br />
      <textarea value={picture} onChange={pictureChange} placeholder={picture1} name='newReviewValue'></textarea>
      <br />
      <button type='submit'>Send feedback</button>
    </form>
    </div>
  );
}

export default Modal;
