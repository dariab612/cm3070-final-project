import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import CourseRatingsReviews from '../CourseRatingsReviews/CourseRatingsReviews';
import '@testing-library/jest-dom/extend-expect';

// Mocking hooks and utilities
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn(),
}));

const mockStore = configureStore([]);
const store = mockStore({
  coursesReducer: {
    courses: [
      { id: 101, name: 'Intro to React', picture: 'react.png', averageRating: 4.5, ratingsCounter: 10, description: 'Learn React basics' },
    ],
  },
  clientsReducer: {
    clients: [
      { telephone: '1234567890', login: 'john_doe' }
    ]
  }
});

describe('CourseRatingsReviews Component', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useParams.mockReturnValue({ courseId: '101' });
    useSelector.mockImplementation(selector => selector(store.getState()));
  });

  it('dispatches actions to fetch courses and clients on component mount', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(<CourseRatingsReviews />);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'GET_FETCH_ALL_COURSES' });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'GET_FETCH_ALL_CLIENTS' });
  });

  it('renders course details and average rating correctly', () => {
    render(<CourseRatingsReviews />);

    expect(screen.getByText('Intro to React')).toBeInTheDocument();
    expect(screen.getByText('4.5 stars')).toBeInTheDocument();
    expect(screen.getByText('10 ratings')).toBeInTheDocument();
    expect(screen.getByText('Learn React basics')).toBeInTheDocument();
  });

  it('submits a review and displays success message', () => {
    window.alert = jest.fn(); // Mocking window.alert since it's used in the component

    render(<CourseRatingsReviews />);

    fireEvent.change(screen.getByPlaceholderText('Write your detailed review here...'), { target: { value: 'Great course!' } });
    fireEvent.click(screen.getByText('Submit Rating & Review'));

    expect(window.alert).toHaveBeenCalledWith('Your detailed rating & review have been successfully added.');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
