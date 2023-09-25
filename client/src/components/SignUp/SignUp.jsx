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
  async function clientFormHandler(event, clientLoginInput, clientPassInput, clientPhoneInput) {
    event.preventDefault();

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          login: clientLoginInput.current.value,
          password: clientPassInput.current.value,
          telephone: clientPhoneInput.current.value,
        })
      })
      const resJson = await response.json()

      dispatch({ type: 'SIGN_UP', payload: resJson })

      dispatch({ type: 'CLIENT_SIGN_UP', payload: { telephone: clientPhoneInput.current.value, password: clientPassInput.current.value } })
    }

    catch (err) {
      console.log(err.message)
    }
    clientLoginInput.current.value = ''
    clientPassInput.current.value = ''
    clientPhoneInput.current.value = ''

  }
  return (
    <>
    <h2>Register</h2>
      {!session.authClient ?
        <div className="sign-up-form">
          <input ref={clientLoginInput} type="text" name="" id="clientLogin" placeholder="Name" required />
          <input ref={clientPassInput} type="password" name="" id="clientPass" placeholder="Password" required />
          <input ref={clientPhoneInput} type="phone" name="" id="clientPhone" placeholder="Phone" required />
          <button onClick={(event) => clientFormHandler(event, clientLoginInput, clientPassInput, clientPhoneInput)}>Register</button>
        </div>
        :
        <p> Registration completed successfully </p>}


      {!clientExist ?

        <div className='max'>{window.location.href = '/signin'}</div>


        : clientExist === 'initial' ?
          <p></p> : <p>This user already exists</p>
      }

    </>
  );
}

export default SignUp;
