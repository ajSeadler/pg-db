import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { FaTag } from "react-icons/fa";
import Sidebar from "./Sidebar"; // Assuming Sidebar is used
import Avatar from "react-avatar";


const PostsByCommunity = () => {
  const { communityId } = useParams(); // Get communityId from URL params
  const navigate = useNavigate(); // To navigate to post details
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [communityName, setCommunityName] = useState(""); // Store the community name
  const [communityDescription, setCommunityDescription] = useState(""); // Store the community description

  // Fetch posts and community info when the component mounts or when the communityId changes
  useEffect(() => {
    const fetchPostsByCommunity = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/posts/community/${communityId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);

        // Extract community name and description from the first post
        if (data.length > 0) {
          setCommunityName(data[0].community_name);
          setCommunityDescription(
            data[0].community_description ||
              "This is a community for tech enthusiasts!"
          );
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsByCommunity();
  }, [communityId]);

  // Navigate to the post detail page
  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

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
              <h2>Welcome to the {communityName} Community!</h2>
              <p>{communityDescription}</p>
              <button className="cta-button">Join the Discussion</button>
            </div>

            {/* Display Posts */}
            <div className="posts-container">
              {loading ? (
                <p>Loading posts...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post.id} className="post">
                    <div className="post-header">
                      <Avatar
                        name={post.author_name}
                        size="40"
                        round={true}
                        className="post-avatar"
                      />
                      <div className="author-info">
                        <h3 className="author-name">{post.author_name}</h3>
                        <span className="community-badge">
                          {" "}
                          • {post.community_name}
                        </span>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p>
                      {post.content.length > 200
                        ? post.content.substring(0, 200) + "..."
                        : post.content}
                    </p>

                    <div className="post-tags">
                      {/* If tags exist, map over them */}
                      {post.tags && post.tags.map((tag, index) => (
                        <div key={index} className="post-tag">
                          <FaTag className="tag-icon" />
                          {tag}
                        </div>
                      ))}
                    </div>

                    {/* Read More Button */}
                    <button
                      className="read-more-btn"
                      onClick={() => handlePostClick(post.id)}
                    >
                      Read more
                    </button>

                    <div className="post-footer">
                      <span>{new Date(post.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No posts found in this community.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostsByCommunity;
