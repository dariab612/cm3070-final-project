import React from 'react';
import { render, screen, fireEvent, debug } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Category from '../Category/Category';
import "@testing-library/jest-dom";

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('Category Component', () => {
  beforeEach(() => {
    useDispatch.mockClear();
  });

  it('renders category details', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const category = {
      id: 1,
      name: 'Test Category',
      picture: 'test.jpg',
    };

    render(
      <MemoryRouter>
        <Category category={category} />
      </MemoryRouter>
    );

    const categoryNameElement = screen.getByText(category.name);
    expect(categoryNameElement).toBeInTheDocument();

    const categoryImageElement = screen.getByAltText('category-img');
    expect(categoryImageElement).toBeInTheDocument();
    expect(categoryImageElement).toHaveAttribute('src', category.picture);
  });
});
