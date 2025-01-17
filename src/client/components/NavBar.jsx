// NavBar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUserCircle } from "react-icons/fa";

const NavBar = () => {
  const [token, setToken] = useState(null);

  // Simulate token check (replace this with real logic in your app)
  useEffect(() => {
    const userToken = localStorage.getItem("token"); // Replace with your actual token logic
    setToken(userToken);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <h1>
          <span
            style={{
              color: "white",
              textDecoration: "underline",
              textDecorationColor: "#06BA63",
            }}
          >
            filo
          </span>
          <span style={{ color: "#06BA63", textDecoration: "underline" }}>
            .
          </span>
        </h1>
      </div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          aria-label="Search"
        />
        <FaSearch size={20} className="search-icon" />
      </div>

      <div className="navbar-actions">
        {token ? (
          <Link to="/me" className="nav-avatar">
            <FaUserCircle size={32} />
          </Link>
        ) : (
          <Link to="/register" className="nav-button">
            <button>Register</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default NavBar;
