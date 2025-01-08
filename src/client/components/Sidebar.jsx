import React from 'react';
import { FaCode, FaCloud, FaLock, FaMicrochip, FaHashtag, FaWindows, FaApple, FaHandshake, FaSearch } from 'react-icons/fa'; // Import icons for each community
import { Link } from 'react-router-dom'; // Import Link component for navigation

const Sidebar = () => {
  return (
    <aside className="sidebar">
      

      {/* Tech Communities List */}
      <div className="tech-communities">
        <h3>Popular Communities <FaHandshake /></h3>
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
          {/* Adding Windows and Mac communities */}
          <li>
            <Link to="/posts/community/5">
              <FaWindows /> Windows
            </Link>
          </li>
          <li>
            <Link to="/posts/community/6">
              <FaApple /> Mac
            </Link>
          </li>
        </ul>
        <div className="tags">
  <h3>Popular Tags <FaHashtag /> </h3>
  <ul>
    <li><Link to="/tags/javascript">JavaScript</Link></li>
    <li><Link to="/tags/python">Python</Link></li>
    <li><Link to="/tags/cloud">Cloud</Link></li>
    <li><Link to="/tags/cybersecurity">Cybersecurity</Link></li>
  </ul>
</div>

        {/* <div className="sidebar-action">
        <button>Search <FaSearch /></button>
      </div> */}
      </div>
    </aside>
  );
};

export default Sidebar;
