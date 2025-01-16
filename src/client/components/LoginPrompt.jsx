// LoginPrompt.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPrompt = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <div className="login-prompt-container">
      <div className="login-prompt-card">
        <h2 className="login-title">Welcome Back!</h2>
        <p className="login-message">Please log in to access your profile and posts.</p>
        <button className="login-button" onClick={handleLoginClick}>
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default LoginPrompt;
