import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import SignUp from '../SignUp/SignUp';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('SignUp Component', () => {
  beforeEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
  });

  it('renders sign-up form correctly', () => {
    useSelector.mockReturnValue({ session: {}, clientExist: 'initial' });

    render(<SignUp />);

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('dispatches SIGN_UP and CLIENT_SIGN_UP actions on form submission', async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({ session: {}, clientExist: 'initial' });

    render(<SignUp />);

    const name = 'John Doe'
    const password = 'password123'
    const phone = '1234567890'

    const nameInput = screen.getByPlaceholderText('Name')
    const passwordInput = screen.getByPlaceholderText('Password')
    const phoneInput = screen.getByPlaceholderText('Phone')

    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.change(screen.getByPlaceholderText('Phone'), { target: { value: phone } });

    // Verify the values are updated
    expect(nameInput.value).toBe(name);
    expect(passwordInput.value).toBe(password);
    expect(phoneInput.value).toBe(phone);


    fireEvent.click(screen.getByText('Click to register'));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'FETCH_SIGN_UP',
      payload: { login: name, password, telephone: phone},
    });
  });

  it('displays error message if user already exists', () => {
    useSelector.mockReturnValue({ session: {}, clientExist: false });

    render(<SignUp />);

    expect(screen.getByText('This user already exists')).toBeInTheDocument();
  });
});
