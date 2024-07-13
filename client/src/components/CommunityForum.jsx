import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommunityForum = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newPost, setNewPost] = useState({ author: '', title: '', content: '' });
    const [newReply, setNewReply] = useState({ author: '', content: '' });
    const [replyingTo, setReplyingTo] = useState(null);

    useEffect(() => {
        let isMounted = true; // Flag to prevent state updates after unmounting
        axios.get('https://goattrack.net/api/forum/posts') // Update this URL if needed
            .then(response => {
                if (isMounted) {
                    setPosts(response.data);
                    setLoading(false);
                }
            })
            .catch(error => {
                if (isMounted) {
                    setError(error.response ? error.response.data.message : 'Error fetching posts');
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false; // Clean up to avoid memory leaks
        };
    }, []);

    const handlePostChange = (e) => {
        const { name, value } = e.target;
        setNewPost(prevState => ({ ...prevState, [name]: value }));
    };

    const handlePostSubmit = (e) => {
        e.preventDefault();
        axios.post('https://goattrack.net/api/forum/posts', newPost) // Update this URL if needed
            .then(response => setPosts(prevPosts => [...prevPosts, response.data]))
            .catch(error => console.error(error));
    };

    const handleReplyChange = (e) => {
        const { name, value } = e.target;
        setNewReply(prevState => ({ ...prevState, [name]: value }));
    };

    const handleReplySubmit = (postId) => {
        axios.post(`https://goattrack.net/api/forum/posts/${postId}/replies`, newReply) // Update this URL if needed
            .then(response => {
                setPosts(posts.map(post => post._id === postId ? response.data : post));
                setReplyingTo(null);
                setNewReply({ author: '', content: '' });
            })
            .catch(error => console.error(error));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="content">
            <h1>Welcome to the Goat Community Forum</h1>
            <p>
                The Goat Community Forum page serves as a community platform for goat owners, breeders, and enthusiasts to share knowledge, ask questions, and discuss various topics related to goat care and management. Users can post new topics, reply to existing discussions, and engage with experts and fellow community members. This interactive space fosters a supportive environment for sharing experiences, tips, and advice on all aspects of goat keeping.
            </p>
            <form onSubmit={handlePostSubmit}>
                <input type="text" name="author" value={newPost.author} onChange={handlePostChange} placeholder="Author" required />
                <input type="text" name="title" value={newPost.title} onChange={handlePostChange} placeholder="Title" required />
                <textarea name="content" value={newPost.content} onChange={handlePostChange} placeholder="Content" required></textarea>
                <button type="submit">Post</button>
            </form>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <h2>{post.title}</h2>
                        <h3>{post.author}</h3>
                        <p>{post.content}</p>
                        <button onClick={() => setReplyingTo(post._id)}>Reply</button>
                        {replyingTo === post._id && (
                            <form onSubmit={(e) => { e.preventDefault(); handleReplySubmit(post._id); }}>
                                <input type="text" name="author" value={newReply.author} onChange={handleReplyChange} placeholder="Author" required />
                                <textarea name="content" value={newReply.content} onChange={handleReplyChange} placeholder="Reply content" required></textarea>
                                <button type="submit">Reply</button>
                            </form>
                        )}
                        <ul>
                            {post.replies.map((reply, index) => (
                                <li key={index}>
                                    <h4>{reply.author}</h4>
                                    <p>{reply.content}</p>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommunityForum;
