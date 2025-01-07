import React from 'react';
import { FaCode, FaCloud, FaLock, FaMicrochip, FaHashtag } from 'react-icons/fa'; // Import icons for each community
import { Link } from 'react-router-dom'; // Import Link component for navigation

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-action">
        <button>Create Topic</button>
      </div>

      {/* Tech Communities List */}
      <div className="tech-communities">
        <h3>Popular Tags <FaHashtag /></h3>
        <ul>
          <li>
            <Link to="/posts/community/1">
              <FaCode /> Programming
            </Link>
          </li>
          <li>
            <Link to="/posts/community/2">
              <FaCloud /> Cloud Computing
            </Link>
          </li>
          <li>
            <Link to="/posts/community/3">
              <FaLock /> Cybersecurity
            </Link>
          </li>
          <li>
            <Link to="/posts/community/4">
              <FaMicrochip /> Hardware Enthusiasts
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
