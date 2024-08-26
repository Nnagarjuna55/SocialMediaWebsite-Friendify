import React, { useState, useEffect } from 'react';
// axios is imported for making HTTP requests.
import axios from 'axios';

const AllPosts = () => {
    // posts, loading, and error are state variables managed with useState
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5001/post/all'); // This should match the backend route
                setPosts(response.data);
            } catch (error) {
                setError('Error fetching posts');
            } finally {
                setLoading(false);
            }
        };

        //fetchPosts is called immediately inside useEffect
        fetchPosts();
    }, []);//The empty dependency array [] ensures that useEffect runs only once, when the component mounts.

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl mb-6 text-center text-gray-800">All Posts</h1>
            <ul className="list-none p-0">
                {posts.map(post => (
                    <li key={post._id} className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                        <p className="text-base text-gray-700">{post.desc}</p>
                        {/* Add more post details here */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllPosts;
