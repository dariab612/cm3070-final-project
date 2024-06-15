import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


function AddModal() {
  const name1 = 'Course name'
  const picture1 = 'Picture name'
  const category1 = 'Category name'
  const description1 = 'Description'

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

  function addCourseFunc(event) {
    event.preventDefault()
    const formData = new FormData();
    formData.append('name', name);
    formData.append('picture', pictureFile);
    formData.append('categoryName', category);
    formData.append('description', description);

    dispatch({ type: 'ADD_FETCH_COURSE', payload: formData })
    setName('')
    setPictureFile(null)
    setCategory('')
    setDescription('')

    alert('Successfully added course');
  }

  return (
    <div>
       <form onSubmit={addCourseFunc}>
      <input value={name} type="text" onChange={nameChange} placeholder={name1} name='courseName'/>
      <br />
      <input type="file" onChange={pictureChange} placeholder={picture1} accept="image/jpeg, image/png, image/jpg" name='coursePicture' />
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
