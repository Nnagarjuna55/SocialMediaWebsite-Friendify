import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Search() {
  const [username, setUsername] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5001/user/search?username=${username}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          placeholder="Search users"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-l-md"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700"
        >
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      <div className="search-results mt-4">
        {results.length > 0 ? (
          results.map(user => (
            <Link
              to={`/profile/${user._id}`}  // Adjust the path based on your route configuration
              key={user._id}
              className="block p-4 border border-gray-300 rounded-md mb-2 hover:bg-gray-100"
            >
              <p className="font-bold">{user.username}</p>
              {/* Add more user details here if needed */}
            </Link>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default Search;
