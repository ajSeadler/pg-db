import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ProfileCard from "./ProfileCard";
import Avatar from "react-avatar";
import LoginPrompt from "./LoginPrompt";
import { FaTag } from "react-icons/fa";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userPosts, setUserPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState(null);

  const [postContent, setPostContent] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [communities, setCommunities] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await fetch("http://localhost:3000/api/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            "Failed to fetch user data. Unauthorized or invalid token."
          );
        }

        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

  
      const fetchUserPosts = async () => {
        try {
          const token = localStorage.getItem("token");
    
          if (!token) {
            throw new Error("No token found. Please log in.");
          }
    
          const response = await fetch(
            "http://localhost:3000/api/users/me/posts",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          if (!response.ok) {
            throw new Error("Failed to fetch user posts.");
          }
    
          const { posts } = await response.json();
          console.log("Fetched user posts:", posts); // Debug log
          setUserPosts(posts);
        } catch (error) {
          setPostsError(error.message);
        } finally {
          setPostsLoading(false);
        }
      };

    const fetchCommunities = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/communities", {
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch communities.");
        }

        const communities = await response.json();
        setCommunities(communities);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    fetchUserData();
    fetchUserPosts();
    fetchCommunities();
  }, []);

  const handlePostContentChange = (e) => setPostContent(e.target.value);
  const handleCommunityChange = (e) => setSelectedCommunity(e.target.value);

  const handleCreatePost = () => {
    console.log("Creating post with content:", postContent);
    console.log("Selected community:", selectedCommunity);
    setPostContent(""); // Reset the post content
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className="homepage-container">
      <main className="homepage-main">
        <Sidebar />
        <div className="feed">
          <div className="feed-content">
            {loading ? (
              <p>Loading user data...</p>
            ) : error ? (
              <LoginPrompt />
            ) : userData ? (
              <>
                <ProfileCard
                  userData={userData}
                  communities={communities}
                  postContent={postContent}
                  selectedCommunity={selectedCommunity}
                  handlePostContentChange={handlePostContentChange}
                  handleCommunityChange={handleCommunityChange}
                  handleCreatePost={handleCreatePost}
                  handleLogout={handleLogout}
                  numberOfPosts={userPosts.length}
          
                />
                <div className="additional-sections">
                  <div className="section-card">
                    <h3 style={{ color: "#fff" }}>Your Posts</h3>
                    {postsLoading ? (
                      <p>Loading posts...</p>
                    ) : postsError ? (
                      <p style={{ color: "red" }}>{postsError}</p>
                    ) : userPosts.length > 0 ? (
                      <div className="posts-container">
                        {userPosts.map((post) => (
                          <div className="post" key={post.id}>
                          <div className="post-header">
                            <Avatar
                              name={post.author_name}
                              size="100"
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
                        ))}
                      </div>
                    ) : (
                      <p>You have no posts yet.</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <p>No user data available.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
