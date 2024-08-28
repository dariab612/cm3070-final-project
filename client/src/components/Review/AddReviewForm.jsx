import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'; 
import './Review.css';

export function AddReviewForm() {
  const dispatch = useDispatch();
  const history = useHistory(); 
  const { session } = useSelector(state => state.sessionReducer); 

  const [name, setName] = useState('');
  const [text, setText] = useState('');

  function nameChange({ target: { value } }) {
    setName(value);
  }

  function textChange({ target: { value } }) {
    setText(value);
  }

  const isValid = false;

  function addReviewFunc(event) {
    event.preventDefault();
    if (!session.authClient) {
      alert("You need to be authorized to complete this action."); 
      history.push('/signin');
      return;
    }

    dispatch({ type: 'ADD_FETCH_REVIEW', payload: { name: name, text: text, isValid: isValid } });
    setName('');
    setText('');

    alert('Your review will be displayed after the moderator approves it.');
  }

  return (
    <form onSubmit={addReviewFunc}>
      <input value={name} type="text" onChange={nameChange} name='clientReviewName' placeholder='Your name' />
      <br />
      <textarea value={text} onChange={textChange} name='newReviewValue' placeholder='Feedback'></textarea>
      <br />
      <button type='submit'>Send feedback</button>
    </form>
  );
}

export default AddReviewForm;
