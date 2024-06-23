import React from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './SignUp.css';

function SignUp(props) {
  const dispatch = useDispatch();
  const clientNameInput = useRef();
  const clientLastnameInput = useRef();
  const clientLoginInput = useRef();
  const clientPassInput = useRef();
  const clientPhoneInput = useRef();
  const { session } = useSelector((state) => state.sessionReducer)
  const { clientExist, clientCreated } = useSelector((state) => state.signupReducer)
  function clientFormHandler(event, clientNameInput, clientLastnameInput, clientLoginInput, clientPassInput, clientPhoneInput) {
    event.preventDefault();
    try {
      dispatch({ type: 'FETCH_SIGN_UP', payload: {
        name: clientNameInput.current.value,
        lastname: clientLastnameInput.current.value,
        login: clientLoginInput.current.value,
        password: clientPassInput.current.value,
        telephone: clientPhoneInput.current.value,
        }
      })
    }
    catch (err) {
      console.log(err.message)
    }
    clientLoginInput.current.value = ''
    clientPassInput.current.value = ''
    clientPhoneInput.current.value = ''

  }
  console.log('38 clientCreated', clientCreated, '38 clientExist', clientExist)
  if (clientCreated === true) {
    window.location.href = 'http://localhost:3000/signin';
  }

  return (
    <>
    <h2>Register</h2>
      {!session.authClient ?
        <div className="sign-up-form">
          <input ref={clientNameInput} type="text" name="" id="clientName" placeholder="Name" required />
          <input ref={clientLastnameInput} type="text" name="" id="clientLastname" placeholder="Lastname" required />
          <input ref={clientLoginInput} type="text" name="" id="clientLogin" placeholder="Login" required />
          <input ref={clientPassInput} type="password" name="" id="clientPass" placeholder="Password" required />
          <input ref={clientPhoneInput} type="phone" name="" id="clientPhone" placeholder="Phone" required />
          <button onClick={(event) => clientFormHandler(event, clientNameInput, clientLastnameInput, clientLoginInput, clientPassInput, clientPhoneInput)}>Click to register</button>
        </div>
        :
        <p> Registration completed successfully </p>}

      <div>
        {clientExist === true ? <p>This user already exists</p> : <p></p>}
      </div>
    </>
  );
}

export default SignUp;
