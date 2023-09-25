import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './AdminChangePass.css';

function AdminChangePass(props) {

  const dispatch = useDispatch();

  const { message } = useSelector(state => state.adminRegistrationReducer);
  const { session } = useSelector((state) => state.sessionReducer)

  function changePass(event) {
    event.preventDefault()

    const oldPass = event.target.oldPass.value;
    const newPass = event.target.newPass.value;
    const newPass2 = event.target.newPass2.value;

    dispatch({ type: 'ADMIN_CHANGE_PASS_FETCH', payload: { oldPass, newPass, newPass2 } })
    event.target.oldPass.value = '';
    event.target.newPass.value = '';
    event.target.newPass2.value = '';

  }


  return (
    <div className="admin-change-pass-block">
    { session.isAdmin ?
      <>
      <h2>Change Password</h2>
      <div className="admin-menu">
        <Link to="/adminreview">Reviews</Link>
        <Link to="/adminchangepass">Change Password</Link>
      </div>
      <form onSubmit={changePass} className="change-pass-admin-form">
        <input onClick={() => dispatch({ type: 'RESET_MESSAGE' })} name='oldPass' type="password" placeholder='Old password' />
        <input name='newPass' type="password" placeholder='New password' />
        <input name='newPass2' type="password" placeholder='Repeat the new password' />
        {message === 'Invalid password' ? <p>{message}</p> : message === 'The entered passwords do not match' ? <p>{message}</p> : <p>{message}</p>}

        <button>Change Password</button>
      </form>
      </> :
      <div>Page not found</div>
      }
    </div>
    
  );
}

export default AdminChangePass;
