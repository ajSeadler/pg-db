import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Avatar from "react-avatar";


const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
          throw new Error("Failed to fetch user data. Unauthorized or invalid token.");
        }

        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="homepage-container">
      <main className="homepage-main">
        <Sidebar />
        <div className="feed">
          <div className="feed-content">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : userData ? (
              <>
                <div className="profile-card">
                  <h2 className="profile-title">
                    <strong style={{ color: "#fff" }}>Welcome,</strong> {userData.name}!
                  </h2>
                  <div className="profile-info">
                  <Avatar
    name={userData.name}
    size="200"
    round={true}
    className="post-avatar2"
  />
                    <p>
                      <strong>Email:</strong> {userData.email}
                    </p>
                  </div>
                </div>
                <div className="additional-sections">
                  <div className="section-card">
                    <h3>Statistics</h3>
                    <p>Coming soon...</p>
                  </div>
                  <div className="section-card">
                    <h3>Recent Activities</h3>
                    <p>Coming soon...</p>
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
