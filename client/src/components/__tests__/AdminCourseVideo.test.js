import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AdminCourseVideos from '../AdminCourseVideos/AdminCourseVideos';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);

describe('AdminCourseVideos Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      courseContentListReducer: {
        courseContentList: [
          { id: 1, title: 'Course 1', link: 'link1', courseId: 101 },
          { id: 2, title: 'Course 2', link: 'link2', courseId: 102 },
        ],
      },
      coursesReducer: {
        courses: [
          { id: 101, title: 'Course 101' },
          { id: 102, title: 'Course 102' },
        ],
      },
    });

    store.dispatch = jest.fn();
  });

  it('renders without crashing and dispatches GET_ALL_COURSE_VIDEOS action', () => {
    render(
      <Provider store={store}>
        <Router>
          <AdminCourseVideos />
        </Router>
      </Provider>
    );

    // Check if the GET_ALL_COURSE_VIDEOS action is dispatched
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_ALL_COURSE_VIDEOS' });

    // Check if course content is rendered
    expect(screen.getByText('Course 1')).toBeInTheDocument();
    expect(screen.getByText('Course 2')).toBeInTheDocument();
  });

  it('shows "No course content" message when courseContentList is empty', () => {
    store = mockStore({
      courseContentListReducer: {
        courseContentList: [],
      },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router>
          <AdminCourseVideos />
        </Router>
      </Provider>
    );

    expect(screen.getByText('No course content')).toBeInTheDocument();
  });
});
