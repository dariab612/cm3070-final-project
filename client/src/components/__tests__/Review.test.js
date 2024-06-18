import React from 'react';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Review from '../Review/Review';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('Review Component', () => {
  beforeEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
  });

  it('renders reviews correctly when data is available', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const mockReviews = [
      { id: 1, name: 'John Doe', text: 'Great product!', isValid: true },
      { id: 2, name: 'Jane Smith', text: 'Awesome service!', isValid: true },
    ];

    useSelector.mockReturnValue({ reviews: mockReviews });

    render(<Review />);

    // Assert that review block and review cards are rendered correctly
    expect(screen.getByText('Reviews')).toBeInTheDocument();

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Great product!')).toBeInTheDocument();

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Awesome service!')).toBeInTheDocument();
  });

  it('dispatches initReviewsAC action on component mount', async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const mockReviews = [
      { id: 1, name: 'John Doe', text: 'Great product!', isValid: true },
      { id: 2, name: 'Jane Smith', text: 'Awesome service!', isValid: true },
    ];

    useSelector.mockReturnValue({ reviews: mockReviews });

    render(
      <Router>
        <Review />
      </Router>
    );

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'GET_FETCH_REVIEW' });
  });

  it('filters out invalid reviews and renders valid ones', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const mockReviews = [
      { id: 1, name: 'John Doe', text: 'Great product!', isValid: true },
      { id: 2, name: 'Jane Smith', text: 'Awesome service!', isValid: false },
      { id: 3, name: 'Mike Johnson', text: 'Fantastic experience!', isValid: true },
    ];

    useSelector.mockReturnValue({ reviews: mockReviews });

    render(<Review />);

    // Assert that only valid reviews are rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    expect(screen.getByText('Mike Johnson')).toBeInTheDocument();
  });
});
