import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminCabinet from '../AdminCabinet/AdminCabinet';
import "@testing-library/jest-dom";

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('AdminCabinet Component', () => {
  beforeEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
  });

  it('renders admin menu when user is admin', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    useSelector.mockReturnValue({ session: { isAdmin: true } });

    render(
      <Router>
        <AdminCabinet />
      </Router>
    );

    expect(screen.getByText('Admin Cabinet')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('Change Password')).toBeInTheDocument();
    expect(screen.getByText('Admin Categories')).toBeInTheDocument();
    expect(screen.getByText('Admin Courses')).toBeInTheDocument();
    expect(screen.getByText('Admin Courses Content')).toBeInTheDocument();
  });

  it('renders "Page not found" when user is not admin', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    useSelector.mockReturnValue({ session: { isAdmin: false } });

    render(
      <Router>
        <AdminCabinet />
      </Router>
    );

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('dispatches ADMIN_RESERVATIONS_FETCH action on mount', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({ session: { isAdmin: true } });

    render(
      <Router>
        <AdminCabinet />
      </Router>
    );

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'ADMIN_RESERVATIONS_FETCH' });
  });
});
