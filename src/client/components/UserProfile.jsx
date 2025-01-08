import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // to handle redirect if no token

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To navigate the user to login page if no token

  useEffect(() => {
    const fetchUserProfile = async () => {
      // Retrieve token from localStorage
      const token = localStorage.getItem('token');

   

      try {
        const response = await fetch('/api/users/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Use the token in the header
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
  }, [navigate]); // Include navigate to avoid dependencies warnings

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
