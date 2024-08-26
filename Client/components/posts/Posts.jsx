
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { request } from '../../util/request';
import Post from '../post/Post';
import Share from '../share/Share';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchTimelinePosts = async () => {
      try {
        const headers = { 'Authorization': `Bearer ${token}` };
        const data = await request(`/post/timelinePosts`, 'GET', headers);
        console.log('Fetched posts:', data); // Check for duplicates here
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Error fetching posts');
      }
    };

    fetchTimelinePosts();
  }, [token]);

  return (
    <div className="p-5">
      <div className="max-w-2xl mx-auto flex flex-col gap-12">
        <Share setPosts={setPosts} />
        {error && <div className="text-red-500 mb-5">{error}</div>}
        <div className="flex flex-col gap-5 w-full">
          {posts.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
