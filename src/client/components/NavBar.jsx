import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import { FaHome, FaRegHandshake, FaLaptopCode } from 'react-icons/fa'; // Icons for NavBar

const NavBar = () => {
  return (
    <header className="navbar">
      <div className="navbar-logo">
      <h1><span style={{ color: 'white', textDecoration: 'underline', textDecorationColor: '#06BA63' }}>filo</span><span style={{ color: '#06BA63', textDecoration:'underline' }}>.</span></h1>

      </div>

      <nav className="navbar-links">
        <ul>
          <li><Link to="/" className="nav-item">Home <FaHome size={24} className="nav-icon" /></Link></li>
          <li><Link to="/posts" className="nav-item">Posts <FaLaptopCode size={24} className="nav-icon" /></Link></li>
          <li><Link to="/communities" className="nav-item">Communities <FaRegHandshake size={24} className="nav-icon" /></Link></li>
        </ul>
      </nav>

      {/* Add other buttons if needed */}
      <div className="navbar-actions">
        <button>Login</button>
        <button>Register</button>
      </div>
    </header>
  );
};

export default NavBar;
