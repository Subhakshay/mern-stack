import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/comments')
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the comments!', error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/comments', { content })
            .then((response) => {
                setComments([...comments, response.data]);
                setContent('');
            })
            .catch((error) => {
                console.error('There was an error posting the comment!', error);
            });
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit} className="comment-form">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter your comment"
                    required
                ></textarea>
                <button type="submit">Post Comment</button>
            </form>
            <div className="comments-section">
                {comments.map((comment) => (
                    <div key={comment._id} className="comment">
                        <p>{comment.content}</p>
                        <small>{new Date(comment.date).toLocaleString()}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;

