import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminCourses from '../AdminCourses/AdminCourses';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../AdminCourses/AdminCourseCard', () => () => <div>Mocked AdminCourseCard</div>);
jest.mock('../AdminCourses/AddModal', () => () => <div>Mocked AddModal</div>);

describe('AdminCourses Component', () => {
  beforeEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
  });

  it('dispatches GET_FETCH_ALL_COURSES action on component mount', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({ courses: [] });

    render(
      <Router>
        <AdminCourses />
      </Router>
    );

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'GET_FETCH_ALL_COURSES' });
  });

  it('renders the courses when they exist', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    const courses = [
      { id: 1, name: 'Course 1', picture: 'picture1.jpg', categoryId: 1, description: 'Description 1' },
      { id: 2, name: 'Course 2', picture: 'picture2.jpg', categoryId: 2, description: 'Description 2' },
    ];
    useSelector.mockReturnValue({ courses });

    render(
      <Router>
        <AdminCourses />
      </Router>
    );

    expect(screen.getByText('Courses')).toBeInTheDocument();
  });

  it('renders "No courses" when no courses exist', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({ courses: [] });

    render(
      <Router>
        <AdminCourses />
      </Router>
    );

    expect(screen.getByText('No courses')).toBeInTheDocument();
  });

  it('toggles AddModal when button is clicked', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({ courses: [] });

    render(
      <Router>
        <AdminCourses />
      </Router>
    );

    const button = screen.getByText('Add courses');
    fireEvent.click(button);
    expect(screen.getByText('Mocked AddModal')).toBeInTheDocument();
  });

  it('renders admin menu links correctly', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({ courses: [] });

    render(
      <Router>
        <AdminCourses />
      </Router>
    );

    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('Change Password')).toBeInTheDocument();
    expect(screen.getByText('Admin Categories')).toBeInTheDocument();
  });
});
