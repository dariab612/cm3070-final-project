import React from 'react';
import { render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminReview from '../AdminReview/AdminReview';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('AdminReview Component', () => {
  beforeEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
  });

  it('renders admin review page correctly for admin user', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    // Mock useSelector to return admin session and reviews
    useSelector.mockReturnValue({
      reviewsReducer: {
        reviews: [
          { id: 1, name: 'User1', text: 'Review 1', isValid: true },
          { id: 2, name: 'User2', text: 'Review 2', isValid: false },
        ],
      },
      sessionReducer: {
        session: { isAdmin: true },
      },
    });

    const { getByText, getAllByText } = render(
      <Router>
        <AdminReview />
      </Router>
    );

    expect(getByText('Admin Reviews')).toBeInTheDocument();

    // Assert that admin menu links are rendered
    expect(getAllByText(/Reviews|Change Password/)).toHaveLength(2);

    // Assert that new reviews and false reviews sections are rendered correctly
    expect(getByText('New reviews')).toBeInTheDocument();
    expect(getByText('Empty')).toBeInTheDocument();
  });

  it('displays "Page not found" for non-admin user', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    // Mock useSelector to return non-admin session
    useSelector.mockReturnValue({
      sessionReducer: {
        session: { isAdmin: false },
      },
    });

    const { getByText } = render(
      <Router>
        <AdminReview />
      </Router>
    );

    // Assert that "Page not found" message is displayed
    expect(getByText('Page not found')).toBeInTheDocument();
  });

  it('dispatches GET_FETCH_REVIEW action on component mount', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    // Mock useSelector to return admin session and empty reviews array
    useSelector.mockReturnValue({
      reviewsReducer: {
        reviews: [],
      },
      sessionReducer: {
        session: { isAdmin: true },
      },
    });

    render(
      <Router>
        <AdminReview />
      </Router>
    );

    // Assert that GET_FETCH_REVIEW action was dispatched
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'GET_FETCH_REVIEW' });
  });
});
