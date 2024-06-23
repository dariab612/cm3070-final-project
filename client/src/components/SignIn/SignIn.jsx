import React from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './SignIn.css';

function SignIn(props) {
  const dispatch = useDispatch();
  const clientPassInput = useRef();
  const clientPhoneInput = useRef();
  const { session } = useSelector((state) => state.sessionReducer)
  const { clientExist, correctPassword } = useSelector((state) => state.signinReducer)
  function clientFormHandler(event, clientPassInput, clientPhoneInput) {
    event.preventDefault();
    try {
      dispatch({ type: 'FETCH_SIGN_IN', payload: {
        password: clientPassInput.current.value,
        telephone: clientPhoneInput.current.value,
      } })

      dispatch({ type: 'SESSION_FETCH' })
    }

    catch (err) {
      console.log(err.message)
    }
    clientPassInput.current.value = ''
    clientPhoneInput.current.value = ''
  }

  if (clientExist === true) {
    window.location.href = 'http://localhost:3000';
  }

  return (
    <>
    <h2>Sign In</h2>
      {!session || !session.authClient ?
        <div className="login-form">
          <input ref={clientPhoneInput} type="phone" name="" id="clientPhone" placeholder='Phone' required />
          <input ref={clientPassInput} type="password" name="" id="clientPass" placeholder='Password' required />
          <button onClick={(event) => clientFormHandler(event, clientPassInput, clientPhoneInput)}>Login</button>
        </div>
        : <p> Authorization was successful </p>}

      {correctPassword === false && !session.authClient ?
        <p>Wrong password entered</p> :
        <p></p>
      }
      {clientExist === false && !session.authClient ?
        <p>This user does not exist</p> :
        <p></p>
      }
      {clientExist && correctPassword && session.authClient ?
        <div>window.location.href = '/'</div>
        : <p></p>}
    </>
  );
}

export default SignIn;
