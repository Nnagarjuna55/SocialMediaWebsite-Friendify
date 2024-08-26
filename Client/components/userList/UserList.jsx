import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/user/findAll');
        setUsers(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (id) => {
    navigate(`/profile/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex-1 p-5">
      <h2 className="text-xl font-semibold mb-4">All Users</h2>
      <ul className="list-none p-0">
        {users.length > 0 ? (
          users.map(user => (
            <li
              key={user._id}
              className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => handleUserClick(user._id)}
            >
              <img
                src={user.profilePicture ? `http://localhost:5001/images/${user.profilePicture}` : '/default-profile.png'}
                alt={user.username}
                className="w-12 h-12 rounded-full object-cover mr-4"
                onError={(e) => {
                  // Log the error to console for debugging
                  console.error('Image failed to load:', e.target.src);
                  e.target.src = '/default-profile.png'; // Fallback to default image
                }}
              />
              <span className="text-lg font-medium">{user.username}</span>
            </li>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  );
};

export default UserList;
