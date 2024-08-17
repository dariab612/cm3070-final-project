import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import './Nav.css';

function Nav(props) {
  const { session } = useSelector((state) => state.sessionReducer)
  const dispatch = useDispatch();

  async function signOut() {
    try {
      await fetch('/sign-out');
      dispatch({ type: 'SESSION_FETCH' })
    }
    catch (err) {
      console.log(err.message)
    }

  }

  return (
    <nav className="main-nav">

    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/categories">Categories</Link>
      </li>

      <li>
        <Link to="/about">About us</Link>
      </li>

      <li>
        <Link to="/donation">Leave a donation</Link>
      </li>

      <li>
        <Link to="/reviews">Reviews</Link>
      </li>

      <li>
        <Link to="/discussionforum">Discussion Forum</Link>
      </li>

      { 
      session.isAdmin ?
        <> <li>
          <Link to='/admincabinet'>Admin Cabinet</Link>
        </li>
          <li><a onClick={() => signOut()}>Sign Out</a></li></>
        : 
        session.authClient ?
        <> 
        <li>
        <Link to='/profile'>Profile</Link>
      </li>
        <li><a onClick={() => signOut()}>Sign Out</a></li></> 
        : 
        <>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
      </>
      }
    </ul>
    </nav>
  );
}

export default Nav;
