import React from 'react';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import Profile from '../Profile/Profile';
import "@testing-library/jest-dom";

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('Profile Component', () => {
  beforeEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
  });

  it('renders course progress correctly when data is available', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const mockViewedVideos = [
      { courseContentId: 1 },
      { courseContentId: 2 },
    ];

    const mockCoursesContent = [
      {
        id: 1,
        courseTitle: 'Course A',
        numberOfVideos: 5,
        viewedVideoCount: 3,
        title: 'Title A1',
        courseId: 1,
        viewedVideosCourseContent: { maxPlayedSeconds: 100, totalSeconds: 300 }
      },
      {
        id: 2,
        courseTitle: 'Course A',
        numberOfVideos: 5,
        viewedVideoCount: 2,
        title: 'Title A2',
        courseId: 1,
        viewedVideosCourseContent: { maxPlayedSeconds: 150, totalSeconds: 300 }
      },
    ];

    useSelector.mockReturnValue({ viewedVideos: mockViewedVideos, coursesContent: mockCoursesContent });

    render(<Profile />);

    // Assert that course progress details are rendered correctly
    expect(screen.getByText('Course Progress')).toBeInTheDocument();

    expect(screen.getByText('Course A')).toBeInTheDocument();
    expect(screen.getByText('Percentage Viewed: 16.67%')).toBeInTheDocument();
    expect(screen.getByText('Title A1')).toBeInTheDocument();
    expect(screen.getByText('Title A2')).toBeInTheDocument();
  });

  it('renders no-reserv message when there are no viewed courses', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const mockViewedVideos = [];
    const mockCoursesContent = [];

    useSelector.mockReturnValue({ viewedVideos: mockViewedVideos, coursesContent: mockCoursesContent });

    render(<Profile />);

    expect(screen.getByText('There are no viewed courses! :')).toBeInTheDocument();
  });

  it('dispatches CABINET_FETCH action on component mount', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    useSelector.mockReturnValue({ viewedVideos: [], coursesContent: [] });

    render(<Profile />);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'CABINET_FETCH' });
  });
});
