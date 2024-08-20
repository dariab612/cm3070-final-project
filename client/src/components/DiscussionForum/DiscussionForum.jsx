import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './DiscussionForum.css';

function DiscussionForum() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [discussionName, setDiscussionName] = useState('');
    const [discussionContent, setDiscussionContent] = useState('');
    const discussions = useSelector(state => state.discussionsReducer.discussions);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'GET_FETCH_DISCUSSIONS'});
    }, [dispatch]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const toggleAddDiscussion = () => {
        setShowForm(!showForm); 
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted:', { discussionName, discussionContent });
        dispatch({ type: 'POST_FETCH_DISCUSSION', payload: { name: discussionName, text: discussionContent }});
        setShowForm(false); 
        alert('Discussion is successfully added.');
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    const isSimilar = (searchTerm, title) => {
        const normalizedSearchTerm = searchTerm.toLowerCase().trim();
        const normalizedTitle = title.toLowerCase().trim();
        return normalizedTitle.includes(normalizedSearchTerm) ||
               normalizedTitle.split(' ').some(word => word.startsWith(normalizedSearchTerm));
    };

    const filteredAndSortedDiscussions = discussions
        .filter(discussion =>
            isSimilar(searchTerm, discussion.name)
        )
        .sort((a, b) => a.id - b.id);

    if (!discussions) {
        return <div>Loading discussions...</div>;
    }

    return (
        <div className="discussion-forum">
            <h2>Discussions</h2>
            <input
                type="text"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-bar"
            />
            <button onClick={toggleAddDiscussion} className="add-discussion-button">
                {showForm ? '- Remove Discussion' : '+ Add Discussion'}
            </button>
            {showForm && (
                <form onSubmit={handleSubmit} className="discussion-form">
                    <input
                        type="text"
                        value={discussionName}
                        onChange={(e) => setDiscussionName(e.target.value)}
                        placeholder="Discussion Title"
                        className="form-input"
                        required
                    />
                    <textarea
                        value={discussionContent}
                        onChange={(e) => setDiscussionContent(e.target.value)}
                        placeholder="Discussion Content"
                        className="form-textarea"
                        required
                    />
                    <div className="button-container">
                        <button type="submit" className="form-submit-button">Submit</button>
                        <button type="button" onClick={handleCancel} className="form-cancel-button">Cancel</button>
                    </div>
                </form>
            )}
            {filteredAndSortedDiscussions.length > 0 ? (
                filteredAndSortedDiscussions.map((discussion, index) => (
                    <div key={index} className="discussion-item">
                        <p style={{ fontWeight: 'bold' }}><Link to={`/discussion/${discussion.id}`}>{discussion.name}</Link></p>
                    </div>
                ))
            ) : (
                <p>No discussions found.</p>
            )}
        </div>
    );
}

export default DiscussionForum;
