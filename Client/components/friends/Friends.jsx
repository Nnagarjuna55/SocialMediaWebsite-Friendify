import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { request } from '../../util/request'; // Use request utility function
import person from '../../assets/na.jpeg'; // Default profile picture

const Friends = () => {
  const [friends, setFriends] = useState([]);
  //useSelector: Retrieves the user object from the Redux store, which contains the currently logged-in user's data.
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchFriends = async (userId) => {
      try {
        const data = await request(`/user/find/userfriends/${userId}`, 'GET', {
          'Content-Type': 'application/json',
        });

        console.log('Fetched friends:', data);
        return data;
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    if (user) {
      //The fetchFriends function is called with user._id if user is available.
      fetchFriends(user._id).then(data => {
        if (data) {
          //The data fetched is used to update the friends state with setFriends.
          setFriends(data);
        }
      });
    }
  }, [user]);

  return (
    <div className="p-5 min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        {friends.length > 0 ? (
          <>
            <h3 className="text-2xl font-semibold mb-4">MyFriends</h3>
            {friends.map((friend) => (
              <div key={friend._id} className="flex items-center mb-2">
                <img
                  src={friend?.profilePic ? `http://localhost:5001/images/${friend.profilePic}` : person}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                  alt={`${friend.username}'s profile`}
                />
                <span className="text-lg text-gray-800 hover:text-gray-600 cursor-pointer">{friend.username}</span>
              </div>
            ))}
          </>
        ) : (
          <h3 className="text-center text-lg text-gray-600">No friends</h3>
        )}
      </div>
    </div>
  );
};

export default Friends;
