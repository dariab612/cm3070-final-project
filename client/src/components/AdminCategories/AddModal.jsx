import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function AddModal() {
  const name1 = 'Category name';
  const picture1 = 'Picture name';

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [pictureFile, setPictureFile] = useState(null);

  function nameChange({ target: { value } }) {
    setName(value);
  }

  function pictureChange({ target: { files } }) {
    setPictureFile(files[0]);
  }

  function addCategoryFunc(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('picture', pictureFile);

    dispatch({ type: 'ADD_FETCH_CATEGORY', payload: formData });

    setName('');
    setPictureFile(null);

    alert('Successfully added category');
  }

  return (
    <div>
      <form onSubmit={addCategoryFunc}>
        <input value={name} type="text" onChange={nameChange} placeholder={name1} name='categoryName' />
        <br />
        <input type="file" onChange={pictureChange} placeholder={picture1} accept="image/jpeg, image/png, image/jpg" name='categoryPicture' />
        <br />
        <button type='submit'>Save category</button>
      </form>
    </div>
  );
}

export default AddModal;
