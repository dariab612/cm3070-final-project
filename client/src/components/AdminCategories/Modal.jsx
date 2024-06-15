import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


function Modal(props) {
  const name1 = props.name
  const picture1 = props.picture
  const id = props.id

  const dispatch = useDispatch()
  const [name, setName] = useState('');
  const [pictureFile, setPictureFile] = useState(null);

  function nameChange({ target: { value } }) {
    setName(value)
  }
  function pictureChange({ target: { files } }) {
    setPictureFile(files[0]);
  }

  function editReviewFunc(event) {
    event.preventDefault()
    const formData = new FormData();
    formData.append('name', name);
    console.log(pictureFile, 'pictureFile')
    formData.append('picture', pictureFile);
    formData.append('id', id);
    dispatch( { type: 'EDIT_FETCH_CATEGORY', payload: formData })
    setName('')
    setPictureFile(null)

    alert('Successfully edited category');
  }

  return (
    <div>
       <form onSubmit={editReviewFunc}>
      <input value={name} type="text" onChange={nameChange} placeholder={name1} name='categoryName'/>
      <br />
      <input type="file" onChange={pictureChange} placeholder={picture1} accept="image/jpeg, image/png, image/jpg" name='categoryPicture' />
      <br />
      <button type='submit'>Edit category</button>
    </form>
    </div>
  );
}

export default Modal;
