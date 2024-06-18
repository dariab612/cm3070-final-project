import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminCategories from '../AdminCategories/AdminCategories';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../AdminCategories/AdminCategoryCard', () => () => <div>Mocked AdminCategoryCard</div>);
jest.mock('../AdminCategories/AddModal', () => () => <div>Mocked AddModal</div>);

describe('AdminCategories Component', () => {
  beforeEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
  });

  it('dispatches GET_FETCH_CATEGORIES action on component mount', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({ categories: [] });

    render(
      <Router>
        <AdminCategories />
      </Router>
    );

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'GET_FETCH_CATEGORIES' });
  });

  it('renders the categories component', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    const categories = [
      { id: 1, name: 'Category 1', picture: 'picture1.jpg' },
      { id: 2, name: 'Category 2', picture: 'picture2.jpg' },
    ];
    useSelector.mockReturnValue({ categories });

    render(
      <Router>
        <AdminCategories />
      </Router>
    );

    expect(screen.getByText('Categories')).toBeInTheDocument();
  });

  it('renders "No categories" when no categories exist', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({ categories: [] });

    render(
      <Router>
        <AdminCategories />
      </Router>
    );

    expect(screen.getByText('No categories')).toBeInTheDocument();
  });

  it('toggles AddModal when button is clicked', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({ categories: [] });

    render(
      <Router>
        <AdminCategories />
      </Router>
    );

    const button = screen.getByText('Add category');
    fireEvent.click(button);
    expect(screen.getByText('Mocked AddModal')).toBeInTheDocument();
  });

  it('renders admin menu links correctly', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({ categories: [] });

    render(
      <Router>
        <AdminCategories />
      </Router>
    );

    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('Change Password')).toBeInTheDocument();
    expect(screen.getByText('Admin Courses')).toBeInTheDocument();
  });
});
