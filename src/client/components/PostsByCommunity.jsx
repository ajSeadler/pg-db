import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get communityId from URL
import Sidebar from './Sidebar';  // Assuming Sidebar is used in this component as well

const PostsByCommunity = () => {
  const { communityId } = useParams(); // Get communityId from URL params
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [communityName, setCommunityName] = useState('');  // Store the community name
  const [communityDescription, setCommunityDescription] = useState(''); // Store the community description

  // Fetch posts and community info when the component mounts or when the communityId changes
  useEffect(() => {
    const fetchPostsByCommunity = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/posts/community/${communityId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        console.log(data); 
        setPosts(data);

        // Extract the community name and description from the first post (assuming all posts are from the same community)
        if (data.length > 0) {
          setCommunityName(data[0].community_name);  // Set the community name from the first post
          setCommunityDescription(data[0].community_description || 'This is a community for tech enthusiasts!'); // Set a default description if missing
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsByCommunity();
  }, [communityId]); // Re-run when the communityId changes

  return (
    <div className="homepage-container">
      <main className="homepage-main">
        {/* Sidebar */}
        <Sidebar />

        {/* Feed Area */}
        <div className="feed">
          <div className="feed-content">
            {/* Welcome Section */}
            <div className="welcome-section">
              <h2>Welcome to the {communityName} Community!</h2> {/* Display the community name */}
              {/* <p>{communityDescription}</p> Show the community description */}
              <button className="cta-button">Join the Discussion</button> {/* Call-to-action button */}
            </div>

            {/* Display Posts */}
            <div className="posts-container">
              {loading ? (
                <p>Loading posts...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                posts.length > 0 ? (
                  posts.map((post) => (
                    <div key={post.id} className="post">
                      <div className="post-header">
                        <h3>{post.author_name}</h3>
                        <span>From {post.community_name}</span> {/* Show the community name here */}
                      </div>
                      <p>{post.content}</p>
                      <div className="post-footer">
                        <span>{new Date(post.created_at).toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No posts found in this community.</p>
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

export default PostsByCommunity;
