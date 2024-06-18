import React from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './SignUp.css';

function SignUp(props) {

  const dispatch = useDispatch();
  const clientLoginInput = useRef();
  const clientPassInput = useRef();
  const clientPhoneInput = useRef();
  const { session } = useSelector((state) => state.sessionReducer)
  const { clientExist } = useSelector((state) => state.signupReducer)
  function clientFormHandler(event, clientLoginInput, clientPassInput, clientPhoneInput) {
    console.log(clientLoginInput.current.value, 'clientLoginInput.current.value,')
    event.preventDefault();

    try {
      dispatch({ type: 'FETCH_SIGN_UP', payload: {
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

  if (session.authClient) {
    window.location.href = 'http://localhost:3000/signin';
  }

  return (
    <>
    <h2>Register</h2>
      {!session.authClient ?
        <div className="sign-up-form">
          <input ref={clientLoginInput} type="text" name="" id="clientLogin" placeholder="Name" required />
          <input ref={clientPassInput} type="password" name="" id="clientPass" placeholder="Password" required />
          <input ref={clientPhoneInput} type="phone" name="" id="clientPhone" placeholder="Phone" required />
          <button onClick={(event) => clientFormHandler(event, clientLoginInput, clientPassInput, clientPhoneInput)}>Click to register</button>
        </div>
        :
        <p> Registration completed successfully </p>}

      <div>
        {!clientExist ? <p>This user already exists</p> : clientExist === 'initial' ? <p></p> : <p></p>}
      </div>
    </>
  );
}

export default SignUp;
