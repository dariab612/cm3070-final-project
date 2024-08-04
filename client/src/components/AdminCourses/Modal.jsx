import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Modal(props) {
  const name1 = props.name;
  const picture1 = props.picture;
  const id = props.id;
  const category1 = props.category;
  const description1 = props.description;
  const isCertified1 = props.isCertified || false; // Default to false if not provided

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [pictureFile, setPictureFile] = useState(null);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isCertified, setIsCertified] = useState(isCertified1);

  useEffect(() => {
    // Initialize state with props values if available
    setName(name1 || '');
    setCategory(category1 || '');
    setDescription(description1 || '');
    setIsCertified(isCertified1);
  }, [name1, category1, description1, isCertified1]);

  function nameChange({ target: { value } }) {
    setName(value);
  }

  function pictureChange({ target: { files } }) {
    setPictureFile(files[0]);
  }

  function categoryChange({ target: { value } }) {
    setCategory(value);
  }

  function descriptionChange({ target: { value } }) {
    setDescription(value);
  }

  function handleCheckboxChange({ target: { checked } }) {
    setIsCertified(checked);
  }

  function editCourseFunc(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('picture', pictureFile);
    formData.append('categoryName', category);
    formData.append('description', description);
    formData.append('isCertified', isCertified); // Add checkbox value
    formData.append('id', id);

    dispatch({ type: 'EDIT_FETCH_COURSE', payload: formData });
    setName('');
    setPictureFile(null);
    setCategory('');
    setDescription('');
    setIsCertified(false); // Reset checkbox state

    alert('Successfully edited course');
  }

  return (
    <div>
      <form onSubmit={editCourseFunc}>
        <input
          value={name}
          type="text"
          onChange={nameChange}
          placeholder={`Course Name: ${name1}`}
          name='courseName'
        />
        <br />
        <input
          type="file"
          onChange={pictureChange}
          placeholder={picture1}
          accept="image/jpeg, image/png, image/jpg"
          name='coursePicture'
        />
        <br />
        <input
          value={category}
          onChange={categoryChange}
          placeholder={`Category Name: ${category1}`}
          name='categoryName'
        />
        <br />
        <textarea
          value={description}
          onChange={descriptionChange}
          placeholder={`Description: ${description1}`}
          name='description'
        />
        <br />
        <label>
          <input
            type="checkbox"
            checked={isCertified}
            onChange={handleCheckboxChange}
            name='isCertified'
          />
          Is Certified
        </label>
        <br />
        <button type='submit'>Edit course</button>
      </form>
    </div>
  );
}

export default Modal;
