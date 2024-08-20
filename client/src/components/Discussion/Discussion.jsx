import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import './Discussion.css';

function Discussion() {
    const discussions = useSelector(state => state.discussionsReducer.discussions);
    const clients = useSelector(state => state.clientsReducer.clients);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        dispatch({ type: 'GET_FETCH_DISCUSSIONS'});
        dispatch({ type: 'GET_FETCH_ALL_CLIENTS' });
    }, [dispatch]);

    if (!discussions || !Array.isArray(clients)) {
        return <div>Loading data...</div>;
    }

    const discussion = discussions.find(d => d.id.toString() === id);
    if (!discussion) {
        return <div>Discussion not found.</div>;
    }

    const authorClient = clients.find(client => client.telephone === discussion.authorTelephone);
    const authorName = authorClient ? (authorClient.name || authorClient.login) : 'Anonymous';

    const createdAtFormatted = new Date(discussion.createdAt).toLocaleDateString("en-US", {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // Mapping answers to client names
    const answersElements = discussion.answers ? Object.entries(discussion.answers).map(([telephone, text]) => {
        const client = clients.find(client => client.telephone === telephone);
        const clientName = client ? client.name : 'Unknown';
        return <p key={telephone}><b>{clientName}:</b> {text}</p>;
    }) : [];

    const handleAnswerSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch({ type: 'ADD_DISCUSSION_ANSWER', payload: { discussionId: id, answer } });
            alert('Your answer is successfully added.');
        } catch (error) {
            console.log('Error adding answer', error);
        }
    };

    return (
        <div className="discussion-details">
            <h3>{discussion.name}</h3>
            <p>{discussion.text}</p>
            <p><b>Posted by: </b>{authorName}</p>
            <p><b>Created on: </b>{createdAtFormatted}</p>
            {answersElements.length > 0 && <div><h4>Answers:</h4>{answersElements}</div>}
            <form onSubmit={handleAnswerSubmit}>
                <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Write your answer here..."
                    className="answer-textarea"
                />
                <button type="submit" className="submit-answer">Submit Answer</button>
            </form>
            <Link to="/discussionforum">← Back to all discussions</Link>
        </div>
    );
}

export default Discussion;
