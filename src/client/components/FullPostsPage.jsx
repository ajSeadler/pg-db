import React, { useState, useEffect } from "react";
import { FaTag } from "react-icons/fa";
import { useParams } from "react-router-dom"; // To get the postId from URL
import Sidebar from "./Sidebar"; // Import Sidebar component


const FullPostPage = () => {
  const { postId } = useParams(); // Get postId from URL params
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/posts/${postId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setPost(data);
        fetchComments(data.id); // Fetch the comments once the post is loaded
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async (postId) => {
      try {
        const response = await fetch(`/api/posts/${postId}/comments`);
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    if (!newComment.trim()) return; // Don't submit empty comments

    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      const newCommentData = await response.json();
      setComments((prevComments) => [newCommentData, ...prevComments]); // Add new comment at the top
      setNewComment(""); // Clear the input field
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="homepage-container">
      <main className="homepage-main">
        {/* Sidebar */}
        <Sidebar />

        {/* Feed Area */}
        <div className="feed">
          <div className="feed-content">
            <div className="posts-container">
              <h2>Post Details</h2>
              {loading ? (
                <p>Loading post...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                <div className="post" key={post.id}>
                  <div className="post-header">
                    <h3>{post.author_name}</h3>
                    <span className="community-badge">
                      {" "}
                      • {post.community_name}
                    </span>
                  </div>
                  <p>{post.content}</p>
                  <div className="post-tags">
                      {/* If tags exist, map over them */}
                      {post.tags && post.tags.map((tag, index) => (
                        <div key={index} className="post-tag">
                          <FaTag className="tag-icon" />
                          {tag}
                        </div>
                      ))}
                    </div>
                  <div className="post-footer">
                    <span>{new Date(post.created_at).toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* Comment Section */}
              <div className="comments-section">
                <h4>Comments</h4>

                {/* Comment Input */}
                <form onSubmit={handleCommentSubmit}>
                  <textarea
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment..."
                    rows="4"
                    className="comment-input"
                  ></textarea>
                  <button type="submit" className="comment-submit-button">
                    Post Comment
                  </button>
                </form>

                {/* Display Existing Comments */}
                {comments.length === 0 ? (
                  <p>No comments yet. Be the first to comment!</p>
                ) : (
                  <div className="comments-list">
                    {comments.map((comment) => (
                      <div className="comment" key={comment.id}>
                        <div className="comment-header">
                          <span className="comment-author">
                            {comment.author_name}
                          </span>
                          <span className="comment-time">
                            {new Date(comment.created_at).toLocaleString()}
                          </span>
                        </div>
                        <p>{comment.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FullPostPage;
