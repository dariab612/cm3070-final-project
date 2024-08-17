import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './DiscussionForum.css';

function DiscussionForum() {
    const [searchTerm, setSearchTerm] = useState('');
    const discussions = useSelector(state => state.discussionsReducer.discussions);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'GET_FETCH_DISCUSSIONS'});
    }, [dispatch]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredDiscussions = discussions.filter(discussion =>
        discussion.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
            {filteredDiscussions.length > 0 ? (
                filteredDiscussions.map((discussion, index) => (
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
