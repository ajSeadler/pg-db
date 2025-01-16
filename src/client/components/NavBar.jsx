import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import { FaHome, FaRegHandshake, FaLaptopCode } from 'react-icons/fa'; // Icons for NavBar
import { ImProfile } from 'react-icons/im';

const NavBar = () => {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <h1>
          <span style={{ color: 'white', textDecoration: 'underline', textDecorationColor: '#06BA63' }}>filo</span>
          <span style={{ color: '#06BA63', textDecoration: 'underline' }}>.</span>
        </h1>
      </div>

      <nav className="navbar-links">
        <ul>
          <li><Link to="/" className="nav-item">Home <FaHome size={24} className="nav-icon" /></Link></li>
          <li><Link to="/posts" className="nav-item">Posts <FaLaptopCode size={24} className="nav-icon" /></Link></li>
          <li><Link to="/communities" className="nav-item">Communities <FaRegHandshake size={24} className="nav-icon" /></Link></li>
          <li><Link to="/me" className="nav-item">Profile <ImProfile size={24} className="nav-icon" /></Link></li>
        </ul>
      </nav>

      {/* Add Login and Register as links */}
      <div className="navbar-actions">
        
        <Link to="/register" className="nav-button">
          <button>Register</button>
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
