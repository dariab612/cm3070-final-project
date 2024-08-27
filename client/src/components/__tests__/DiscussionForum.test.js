import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import DiscussionForum from '../DiscussionForum/DiscussionForum';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);
const initialState = {
    discussionsReducer: {
        discussions: [
            { id: 1, name: 'React Discussion', text: 'Discussion about React.' },
            { id: 2, name: 'Redux Discussion', text: 'Discussion about Redux.' }
        ]
    }
};

describe('DiscussionForum Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
        store.dispatch = jest.fn();
    });

    // Wrap the component in MemoryRouter to provide the necessary router context
    const renderComponent = () => render(
        <Provider store={store}>
            <MemoryRouter> 
                <DiscussionForum />
            </MemoryRouter>
        </Provider>
    );

    it('renders discussion forum with discussions', () => {
        renderComponent();
        expect(screen.getByText('Discussions')).toBeInTheDocument();
        expect(screen.getByText('React Discussion')).toBeInTheDocument();
    });

    it('should filter discussions based on search term', () => {
        renderComponent();
        fireEvent.change(screen.getByPlaceholderText('Search discussions...'), { target: { value: 'Redux' } });
        expect(screen.getByText('Redux Discussion')).toBeInTheDocument();
        expect(screen.queryByText('React Discussion')).not.toBeInTheDocument();
    });

    it('should toggle the add discussion form on button click', () => {
        renderComponent();
        fireEvent.click(screen.getByText('+ Add Discussion'));
        expect(screen.getByPlaceholderText('Discussion Title')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Discussion Content')).toBeInTheDocument();

        fireEvent.click(screen.getByText('- Remove Discussion'));
        expect(screen.queryByPlaceholderText('Discussion Title')).not.toBeInTheDocument();
        expect(screen.queryByPlaceholderText('Discussion Content')).not.toBeInTheDocument();
    });

    it('handles submission of new discussion', () => {
        renderComponent();
        fireEvent.click(screen.getByText('+ Add Discussion'));
        fireEvent.change(screen.getByPlaceholderText('Discussion Title'), { target: { value: 'New Discussion' } });
        fireEvent.change(screen.getByPlaceholderText('Discussion Content'), { target: { value: 'New content here...' } });
        fireEvent.click(screen.getByText('Submit'));
        
        expect(store.dispatch).toHaveBeenCalledWith({
            type: 'POST_FETCH_DISCUSSION',
            payload: {
                name: 'New Discussion',
                text: 'New content here...'
            }
        });
        expect(screen.queryByPlaceholderText('Discussion Title')).not.toBeInTheDocument();
    });

    it('should display no discussions message when filter results in no discussions', () => {
        renderComponent();
        fireEvent.change(screen.getByPlaceholderText('Search discussions...'), { target: { value: 'Vue' } });
        expect(screen.getByText('No discussions found.')).toBeInTheDocument();
    });
});
