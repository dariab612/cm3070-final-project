import React from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AdminForm.css';

function Admin(props) {
  const adminLoginInput = useRef();
  const adminPassInput = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const { answer } = useSelector((state) => state.adminFormReducer);
  const { session } = useSelector((state) => state.sessionReducer);

  function adminFormHandler(event, adminLoginInput, adminPassInput) {
    event.preventDefault();
    dispatch({ type: 'ADMIN_AUTH_FETCH', payload: { login: adminLoginInput.current.value, pass: adminPassInput.current.value } });
    adminLoginInput.current.value = '';
    adminPassInput.current.value = '';
  }

  return (
    <div className="admin-form">
      <h2>Admin Sign In</h2>
      <input onClick={() => dispatch({ type: 'ADMIN_CHECK_RESET' })} ref={adminLoginInput} type="text" placeholder="Login" />
      <input ref={adminPassInput} type="password" placeholder="Password" />
      <button onClick={(event) => adminFormHandler(event, adminLoginInput, adminPassInput)}>Log in</button>
      {answer.checked ? answer.checkAdmin ? answer.checkPass ? 
        <div></div> :
        <div>Invalid password</div> :
        <div>Invalid Login</div> :
        <div></div>
      }
      <div>{session.isAdmin ? window.location.href = 'http://localhost:3000/admincabinet' : <></>}</div>
    </div>
  );
}

export default Admin;
