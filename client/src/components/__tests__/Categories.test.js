import React from 'react';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import Categories from '../Categories/Categories'; 
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

  it('renders categories component', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const mockCategories = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ];

    useSelector.mockReturnValue({ categories: mockCategories });

    render(<Categories />);

    expect(screen.getByText('Course Categories')).toBeInTheDocument();
  });

  it('renders "No categories" message when categories do not exist', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    useSelector.mockReturnValue({ categories: [] });

    render(<Categories />);

    expect(screen.getByText('Course Categories')).toBeInTheDocument();
    expect(screen.getByText('No categories')).toBeInTheDocument();
  });

  it('dispatches GET_FETCH_CATEGORIES action on mount', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    useSelector.mockReturnValue({ categories: [] });

    render(<Categories />);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'GET_FETCH_CATEGORIES' });
  });
});
