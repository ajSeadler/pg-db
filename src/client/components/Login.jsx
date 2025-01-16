import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserData, loginUser, fetchCommunities } from "./apiCalls.js";
import Dashboard from "./Dashboard";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Fetch user details if a token exists
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          setLoading(true);
          const data = await fetchUserData(token); // Includes user info and posts
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user details:", error.message);
          setMessage("Session expired. Please log in again.");
          localStorage.removeItem("token");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, []);

  // Fetch available communities if the user is logged in
  useEffect(() => {
    const loadCommunities = async () => {
      try {
        const data = await fetchCommunities();
        setCommunities(data);
      } catch (error) {
        console.error("Error loading communities:", error.message);
      }
    };

    if (userData) {
      loadCommunities();
    }
  }, [userData]);

  // Handlers for input fields
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle login
  const login = async () => {
    try {
      setLoading(true);
      const result = await loginUser(email, password);

      if (result.token) {
        localStorage.setItem("token", result.token);
        setMessage("Login successful!");
        setEmail("");
        setPassword("");

        const userData = await fetchUserData(result.token);
        setUserData(userData);
        navigate("/"); // Redirect to home or dashboard
      } else {
        setMessage("Login successful, but no token received.");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      setMessage("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login();
    } else {
      setMessage("Please fill in both email and password.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    setCommunities([]);
    setMessage("Logged out successfully.");
  };

  // Number of posts for the user

  // Render dashboard if user is logged in
  if (userData) {
    return (
      <Dashboard
        userData={userData}
        communities={communities}
        handleLogout={handleLogout}
        numberOfPosts={userData.posts}
      />
    );
  }

  // Render login form
  return (
    
    <div className="login-container">
      <div className="login-form">
        <h1>Sign In</h1>
        <p className="login-description">
          Welcome back! Please log in to your account.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
              disabled={loading} // Disable inputs while loading
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              required
              disabled={loading} // Disable inputs while loading
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
