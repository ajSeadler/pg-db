import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Avatar from "react-avatar";
import { FaHandshake, FaTag } from "react-icons/fa";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const communityFilter =
          selectedCommunity !== "all" ? `&community=${selectedCommunity}` : "";
        const response = await fetch(
          `/api/posts?page=${page}&limit=6${communityFilter}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, selectedCommunity]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await fetch(`/api/communities`);
        if (!response.ok) {
          throw new Error("Failed to fetch communities");
        }
        const data = await response.json();
        setCommunities(data);
      } catch (error) {
        console.error("Error fetching communities:", error);
        setError(error.message);
      }
    };

    fetchCommunities();
  }, []);

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));

  const handleCommunityChange = (event) => {
    setSelectedCommunity(event.target.value);
    setPage(1); // Reset to the first page when changing the filter
  };

  return (
    <div className="homepage-container">
      <main className="homepage-main">
        <Sidebar />

        <div className="feed">
          <div className="feed-content">
            {/* Community Selector */}
            {/* <div className="community-selector">
              <select
                className="community-dropdown"
                value={selectedCommunity}
                onChange={handleCommunityChange}
              >
                <option value="all">All Communities</option>
                {communities.map((community) => (
                  <option key={community.id} value={community.name}>
                    {community.name}
                  </option>
                ))}
              </select>
            </div> */}

            <div className="posts-container">
              {loading ? (
                <p>Loading posts...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                posts.map((post) => (
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
                      {post.tags &&
                        post.tags.map((tag, index) => (
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
                ))
              )}
            </div>

            <div className="pagination">
              <button onClick={handlePreviousPage} disabled={page === 1}>
                Previous
              </button>
              <button onClick={handleNextPage}>Next</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostsPage;
