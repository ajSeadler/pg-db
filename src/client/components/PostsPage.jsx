import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Avatar from "react-avatar";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/posts?page=${page}&limit=6`);
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
  }, [page]);

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));

  return (
    <div className="homepage-container">
      <main className="homepage-main">
        <Sidebar />

        <div className="feed">
          <div className="feed-content">
            <div className="pagination">
              <button onClick={handlePreviousPage} disabled={page === 1}>
                Previous
              </button>
              <button onClick={handleNextPage}>Next</button>
            </div>

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
    size="40"
    round={true}
    className="post-avatar"
  />
  <div className="author-info">
    <h3 className="author-name">{post.author_name}</h3>
    <span className="community-name">From {post.community_name}</span>
  </div>
</div>

                    <p>
                      {post.content.length > 200
                        ? post.content.substring(0, 200) + "..."
                        : post.content}
                    </p>
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostsPage;
