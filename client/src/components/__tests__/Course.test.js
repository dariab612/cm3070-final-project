import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Course from '../Course/Course';
import "@testing-library/jest-dom";

describe('Course Component', () => {
  const course = {
    id: 1,
    name: 'Test Course',
    picture: 'test-picture.jpg'
  };

  it('renders course component, course name and image', () => {
    render(
      <Router>
        <Course course={course} />
      </Router>
    );

    // Assert that course name is rendered as a link
    const courseNameLink = screen.getByRole('link', { name: /Test Course/i });
    expect(courseNameLink).toBeInTheDocument();
    expect(courseNameLink.getAttribute('href')).toBe(`/categories/:categoryname/${course.name}/${course.id}`);


    // Assert that image is rendered
    const imageElement = screen.getByAltText('');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', `/${course.picture}`);
  });
});
