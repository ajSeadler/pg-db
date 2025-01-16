import React, { useState } from "react";
import Dashboard from "./Dashboard"; // Import the Dashboard component

const ProfileCard = ({
  userData,
  communities,
  handleLogout,
  numberOfPosts,
}) => {
  // Local state for post content and selected community
  const [postContent, setPostContent] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState("");

  // Handle content change in the textarea
  const handlePostContentChange = (event) => {
    setPostContent(event.target.value);
  };

  // Handle community selection change
  const handleCommunityChange = (event) => {
    setSelectedCommunity(event.target.value);
  };

  // Handle creating a post
  const handleCreatePost = async () => {
    if (!postContent || !selectedCommunity) {
      alert("Please provide content and select a community.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData.id, // Assuming `userData` has an `id` field
          content: postContent,
          communityId: selectedCommunity,
          tags: [], // Optional: Add tags if needed
        }),
      });

      if (!response.ok) {
        throw new Error("There was an error creating the post.");
      }

      const post = await response.json();
      console.log("Post created successfully:", post);
      
      // Optionally, you can reset the form fields
      setPostContent("");
      setSelectedCommunity("");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("There was an error creating the post.");
    }
  };

  return (
    <div className="profile-card">
      {/* Profile Info */}
      <Dashboard 
        userData={userData} 
        communities={communities} 
        handleLogout={handleLogout}
        numberOfPosts={numberOfPosts} 
      />

      {/* Create Post Section */}
      <div className="create-post-card">
        <textarea
          value={postContent}
          onChange={handlePostContentChange}
          placeholder="Jump into the discussion!"
          className="create-post-textarea"
          rows="4"
        />
        <div className="create-post-footer">
          <div className="community-select-container">
            <select
              id="community-select"
              value={selectedCommunity || ""}
              onChange={handleCommunityChange}
              className="community-select"
            >
              <option value="">Select a Community</option>
              {communities.map((community) => (
                <option key={community.id} value={community.id}>
                  {community.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleCreatePost} className="create-post-button">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
