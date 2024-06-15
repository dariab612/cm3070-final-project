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
  const [pictureFile, setPictureFile] = useState(null);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  function nameChange({ target: { value } }) {
    setName(value)
  }

  function pictureChange({ target: { files } }) {
    setPictureFile(files[0]);
  }

  function categoryChange({ target: { value } }) {
    setCategory(value)
  }

  function descriptionChange({ target: { value } }) {
    setDescription(value)
  }


  function editCourseFunc(event) {
    event.preventDefault()
    const formData = new FormData();
    formData.append('name', name);
    formData.append('picture', pictureFile);
    formData.append('categoryName', category);
    formData.append('description', description);
    formData.append('id', id);

    dispatch( { type: 'EDIT_FETCH_COURSE', payload: formData })
    setName('')
    setPictureFile(null)

    alert('Successfully edited course');
  }

  return (
    <div>
       <form onSubmit={editCourseFunc}>
      <input value={name} type="text" onChange={nameChange} placeholder={`Course Name: ${name1}`} name='courseName'/>
      <br />
      <input type="file" onChange={pictureChange} placeholder={picture1} accept="image/jpeg, image/png, image/jpg" name='coursePicture' />
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
