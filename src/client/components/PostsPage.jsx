import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Using useNavigate from React Router v6
import Sidebar from './Sidebar';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Initialize navigate

  useEffect(() => {
    // Fetch posts whenever the page changes
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/posts?page=${page}&limit=6`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    // Scroll to top whenever the page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }, [page]);  // This effect will run every time the page changes

  const handlePostClick = (postId) => {
    // Redirect to the full post page
    navigate(`/posts/${postId}`);
  };

  const handleNextPage = () => setPage(prevPage => prevPage + 1);
  const handlePreviousPage = () => setPage(prevPage => prevPage > 1 ? prevPage - 1 : prevPage);

  return (
    <div className="homepage-container">
      <main className="homepage-main">
        <Sidebar />

        <div className="feed">
          <div className="feed-content">
          <div className="pagination">
              <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
              <button onClick={handleNextPage}>Next</button>
            </div>
            <div className="posts-container">
              {loading ? (
                <p>Loading posts...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                posts.map(post => (
                  <div className="post" key={post.id} onClick={() => handlePostClick(post.id)}>
                    <div className="post-header">
                      <h3>{post.author_name}</h3>
                      <span>From {post.community_name}</span>
                    </div>
                    <p>{post.content}</p>
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

      <footer className="homepage-footer">
        <p>© 2025 Tech Forum. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default PostsPage;
