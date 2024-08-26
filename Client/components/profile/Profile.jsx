import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
import { useParams } from 'react-router-dom';
import { request } from '../../util/request';
import { updateUserProfile } from '../../redux/authSlice'; // Import updateUser action
import coverPicture from '../../assets/italy.jpg';
import profilePicture from '../../assets/na.jpeg';
import Share from '../share/Share';
import Post from '../post/Post';

const Profile = () => {
    const { id } = useParams();
    const dispatch = useDispatch(); // Initialize useDispatch
    const { user, token } = useSelector((state) => state.auth);
    const [userPosts, setUserPosts] = useState([]);
    const [isFollowed, setIsFollowed] = useState(false);
    const [profileDetails, setProfileDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BACKEND_URL = `http://localhost:5001/images/`;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await request(`/post/find/userposts/${id}`, 'GET');
                setUserPosts(response);
            } catch (error) {
                setError('Error fetching posts');
                console.error('Error fetching posts:', error);
            }
        };

        const fetchUserData = async () => {
            try {
                const response = await request(`/user/find/${id}`, 'GET', {
                    'Authorization': `Bearer ${token}`
                });
                setProfileDetails(response);
                setIsFollowed(response.followers.includes(user._id));
                if (id === user._id) {
                    dispatch(updateUserProfile(response)); // Update Redux store
                    console.log("response", response);

                }
            } catch (error) {
                setError('Error fetching user data');
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
        fetchUserData();
    }, [id, user._id, token, dispatch]);

    const handleFollow = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            if (isFollowed) {
                await request(`/user/unfollow/${id}`, 'PUT', headers, { userId: user._id });
            } else {
                await request(`/user/follow/${id}`, 'PUT', headers, { userId: user._id });
            }

            setIsFollowed(prev => !prev);
        } catch (error) {
            setError('Error handling follow/unfollow');
            console.error('Error handling follow/unfollow:', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="w-full max-w-5xl mx-auto py-6 px-4">
            {error && <p className="text-red-500">{error}</p>}
            <div className="relative">
                <img
                    src={profileDetails.coverPic ? `${BACKEND_URL}${profileDetails.coverPic}` : coverPicture}
                    className="w-full h-72 object-cover"
                    alt="Cover"
                />
                <img
                    src={profileDetails.profilePic ? `${BACKEND_URL}${profileDetails.profilePic}` : profilePicture}
                    className="w-36 h-36 rounded-full object-cover absolute top-56 left-1/2 transform -translate-x-1/2 border-4 border-white"
                    alt="Profile"
                />
            </div>
            <div className="text-center mt-20">
                <h2 className="text-2xl font-bold">{profileDetails.username}</h2>
                {id !== user._id && (
                    <button
                        className={`mt-4 px-6 py-2 rounded-full text-white ${isFollowed ? 'bg-red-500' : 'bg-blue-500'} hover:bg-opacity-80`}
                        onClick={handleFollow}
                    >
                        {isFollowed ? 'Unfollow' : 'Follow'}
                    </button>
                )}
                {id === user._id && <Share />}
            </div>
            <div className="mt-8">
                {userPosts.length > 0 ? (
                    userPosts.map(post => (
                        <Post key={post._id} post={post} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No posts available</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
