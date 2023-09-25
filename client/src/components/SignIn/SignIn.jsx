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
  async function clientFormHandler(event, clientPassInput, clientPhoneInput) {
    event.preventDefault();
    try {
      const response = await fetch('/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({
          password: clientPassInput.current.value,
          telephone: clientPhoneInput.current.value,
        })

      })
      const resJson = await response.json()

      dispatch({ type: 'SIGN_IN', payload: resJson })

      dispatch({ type: 'SESSION_FETCH' })
    }

    catch (err) {
      console.log(err.message)
    }
    clientPassInput.current.value = ''
    clientPhoneInput.current.value = ''
  }
  return (
    <>
    <h2>Sign In</h2>
      {!session.authClient ?
        <div className="login-form">
          <input ref={clientPhoneInput} type="phone" name="" id="clientPhone" placeholder='Phone' required />
          <input ref={clientPassInput} type="password" name="" id="clientPass" placeholder='Пароль' required />
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
