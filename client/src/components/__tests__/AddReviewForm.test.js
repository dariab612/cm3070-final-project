import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import AddReviewForm from '../Review/AddReviewForm';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('AddReviewForm Component', () => {
  beforeEach(() => {
    useDispatch.mockClear();
  });

  it('renders add review form correctly', () => {
    render(<AddReviewForm />);

    // Assert that input fields and submit button are rendered
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Feedback')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send feedback' })).toBeInTheDocument();
  });

  it('updates name state on input change', () => {
    render(<AddReviewForm />);

    const nameInput = screen.getByPlaceholderText('Your name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    // Assert that name input field updates correctly
    expect(nameInput).toHaveValue('John Doe');
  });

  it('updates text state on textarea change', () => {
    render(<AddReviewForm />);

    const textArea = screen.getByPlaceholderText('Feedback');
    fireEvent.change(textArea, { target: { value: 'This is a test review.' } });

    // Assert that textarea updates correctly
    expect(textArea).toHaveValue('This is a test review.');
  });

  it('dispatches ADD_FETCH_REVIEW action on form submission', async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(<AddReviewForm />);

    const name = 'John Doe';
    const text = 'This is a test review.';

    const nameInput = screen.getByPlaceholderText('Your name');
    const textArea = screen.getByPlaceholderText('Feedback');
    const submitButton = screen.getByRole('button', { name: 'Send feedback' });

    // Ensure the inputs are correctly selected
    expect(nameInput).toBeInTheDocument();
    expect(textArea).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.change(textArea, { target: { value: text } });

    // Verify the values are updated
    expect(nameInput.value).toBe(name);
    expect(textArea.value).toBe(text);

    fireEvent.click(submitButton);

    // Assert that dispatch is called with the correct action and payload
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_FETCH_REVIEW',
      payload: { name, text, isValid: false },
    });
  });
});
