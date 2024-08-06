import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';

function AdminCourseCard({ name, picture, id, description, categoryId }) {
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.categoriesReducer.categories)
  useEffect(() => {dispatch({ type: 'GET_FETCH_CATEGORIES' })}, [dispatch])
  const [ modal, setModal ] = useState(false)

  const category = categories.length ? categories.find(category => category.id === categoryId) : ''
  return (
    <>
    <div className="course-card">
        <h3>{name}</h3>
        <p>{description}</p>
        <img src={picture} alt="course-img" />
        <button onClick={() => dispatch({ type: 'DELETE_FETCH_COURSE', payload: { id } })}>Delete course</button>
        <button onClick={() => setModal(!modal)}>Edit course</button>
        { modal && <Modal name={name} picture={picture} id={id} description={description} category={category.name}/> }
    </div>
    </>
  )
}

export default AdminCourseCard;
