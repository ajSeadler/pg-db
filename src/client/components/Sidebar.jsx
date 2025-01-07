import React from 'react';
import { FaCode, FaCloud, FaLock, FaMicrochip } from 'react-icons/fa'; // Import icons for each community

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-action">
        <button>Login</button>
      </div>
      <div className="sidebar-action">
        <button>Register</button>
      </div>
      <div className="sidebar-action">
        <button>Create Topic</button>
      </div>

      {/* Tech Communities List */}
      <div className="tech-communities">
        <h3>Popular Communities</h3>
        <ul>
          <li><a href="#"><FaCode /> Programming</a></li>
          <li><a href="#"><FaCloud /> Cloud Computing</a></li>
          <li><a href="#"><FaLock /> Cybersecurity</a></li>
          <li><a href="#"><FaMicrochip /> Hardware Enthusiasts</a></li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
