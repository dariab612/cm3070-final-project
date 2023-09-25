import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './AdminCabinet.css';

function AdminCabinet(props) {

  const dispatch = useDispatch()
  const { session } = useSelector((state) => state.sessionReducer)
  useEffect(() => {
    dispatch({ type: 'ADMIN_RESERVATIONS_FETCH' })
  }, [dispatch])
  return (
    <div className="admin-panel">
      { session.isAdmin ?
      <>
      <h2>Admin Cabinet</h2>
      <div className="admin-menu">
        <Link to="/adminreview">Reviews</Link>
        <Link to="/adminchangepass">Change Password</Link>
      </div>
      </>
      : <div>Page not found</div>
      }
    </div>
  );
}

export default AdminCabinet;
