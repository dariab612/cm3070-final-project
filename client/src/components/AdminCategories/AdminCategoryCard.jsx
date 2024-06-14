import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from './Modal';

import './AdminCategoryCard.css';
function AdminCategoryCard({ name, picture, id }) {
  const dispatch = useDispatch()
  const [ modal, setModal ] = useState(false)
  return (
    <>
    <div className="category-card">
        <h3>{name}</h3>
        <img src={picture} alt="category-img" />
        <button onClick={() => dispatch({ type: 'DELETE_FETCH_CATEGORY', payload: { id } })}>Delete category</button>
        <button onClick={() => setModal(!modal)}>Edit category</button>
        { modal && <Modal name={name} picture={picture} id={id}/> }
    </div>
    </>
  )
}

export default AdminCategoryCard;
