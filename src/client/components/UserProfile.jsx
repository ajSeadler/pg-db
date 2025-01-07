import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetch user data from the backend /me route using fetch
        const response = await fetch("/api/users/me", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`, // Get token from localStorage or context
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching user data");
        }

        const data = await response.json();
        setUser(data); // Set user data in state
      } catch (err) {
        setError(err.message); // Set error state if fetch fails
      } finally {
        setLoading(false); // Set loading to false after the fetch completes
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      <div className="user-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {/* Add more fields based on the user object */}
        <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default UserProfile;
