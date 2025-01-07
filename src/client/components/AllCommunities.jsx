import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // For navigation to individual community pages
import Sidebar from './Sidebar';  // Assuming Sidebar is used in this component

const AllCommunities = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all communities when the component mounts
  useEffect(() => {
    const fetchCommunities = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/communities');
        if (!response.ok) {
          throw new Error('Failed to fetch communities');
        }
        const data = await response.json();
        setCommunities(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []); // Empty dependency array to run once on component mount

  return (
    <div className="homepage-container">
      <main className="homepage-main">
        {/* Sidebar */}
        <Sidebar />

        {/* Feed Area */}
        <div className="feed">
          <div className="feed-content">
            {/* Header Section */}
            {/* <h2 className="communities-title">All Communities</h2> */}
            
            {/* Display Communities */}
            <div className="communities-container">
              {loading ? (
                <p>Loading communities...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                communities.length > 0 ? (
                  communities.map((community) => (
                    <div key={community.id} className="community-card">
                      <div className="community-header">
                        <h3>{community.name}</h3>
                        <p>{community.description}</p>
                      </div>

                      {/* Community Actions or Details */}
                      <div className="community-footer">
                        <Link to={`/posts/community/${community.id}`} className="view-button">
                          View Community
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No communities available.</p>
                )
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="homepage-footer">
        <p>© 2025 Tech Forum. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AllCommunities;
