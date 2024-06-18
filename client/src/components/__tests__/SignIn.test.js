import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from '../SignIn/SignIn';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('SignIn Component', () => {
  beforeEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
  });

  it('renders sign in form correctly', () => {
    // Mock useSelector to return initial states
    useSelector.mockReturnValue({
      sessionReducer: { session: { authClient: false } },
      signinReducer: { clientExist: null, correctPassword: null },
    });

    const { getByText, getByPlaceholderText } = render(<SignIn />);

    // Assert that "Sign In" header is rendered
    expect(getByText('Sign In')).toBeInTheDocument();

    // Assert that input fields and button are rendered
    expect(getByPlaceholderText('Phone')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
  });

  it('handles form submission and dispatches actions correctly', async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    // Mock useSelector to return initial states
    useSelector.mockReturnValue({
      sessionReducer: { session: { authClient: false } },
      signinReducer: { clientExist: null, correctPassword: null },
    });

    const { getByText, getByPlaceholderText } = render(<SignIn />);

    // Mock fetch to return a successful response
    global.fetch = jest.fn().mockResolvedValue({
      json: () => ({ success: true }),
    });

    const phone = '1234567890'
    const password = 'password123'
  
    const phoneInput = getByPlaceholderText('Phone')
    const passwordInput = getByPlaceholderText('Password')
  
    fireEvent.change(phoneInput, { target: { value: phone } });
    fireEvent.change(passwordInput, { target: { value: password } });

    // Simulate form submission
    fireEvent.click(getByText('Login'));

    // Assert that SIGN_IN and SESSION_FETCH actions were dispatched
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_SIGN_IN', payload: { password, telephone: phone } });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SESSION_FETCH' });

    // Assert that input fields are cleared after form submission
    expect(getByPlaceholderText('Phone').value).toBe('');
    expect(getByPlaceholderText('Password').value).toBe('');
  });

  // it('displays error messages for incorrect login attempts', async () => {
  //   const mockDispatch = jest.fn();
  //   useDispatch.mockReturnValue(mockDispatch);

  //   // Mock useSelector to return initial states
  //   useSelector.mockReturnValue({
  //     sessionReducer: { session: { authClient: false } },
  //     signinReducer: { clientExist: false, correctPassword: false },
  //   });

  //   const { getByText } = render(<SignIn />);

  //   // Assert that error messages are displayed
  //   expect(getByText('Wrong password entered')).toBeInTheDocument();
  //   expect(getByText('This user does not exist')).toBeInTheDocument();
  // });
});
