import React, { useEffect, useState } from "react";
import {
  FaCode,
  FaCloud,
  FaLock,
  FaMicrochip,
  FaHashtag,
  FaWindows,
  FaApple,
  FaHandshake,
  FaHome,
  FaRegHandshake,
  FaAngleDown,
  FaLaptopCode,
} from "react-icons/fa"; // Import icons
import { NavLink } from "react-router-dom"; // Import NavLink for active class support
import { ImProfile } from "react-icons/im";

const Sidebar = () => {
  // const [cryptoPrices, setCryptoPrices] = useState([]);
  const [error, setError] = useState(null);

  // Fetch crypto prices from your backend
  // useEffect(() => {
  //   const fetchCryptoPrices = async () => {
  //     try {
  //       const response = await fetch("/api/crypto"); // Correct route path
  //       const data = await response.json();

  //       if (response.ok) {
  //         // Assuming the response contains the prices in an object with 'prices' key
  //         setCryptoPrices(data.prices || []); // Ensure the data is an array
  //       } else {
  //         throw new Error(data.message || "Failed to fetch crypto prices");
  //       }
  //     } catch (error) {
  //       setError("Error fetching crypto prices");
  //     }
  //   };

  //   fetchCryptoPrices();
  // }, []);

  return (
    <aside className="sidebar">
      {/* Main Navigation Links */}
      <nav className="main-nav">
        <ul>
          <li>
            <NavLink to="/" activeClassName="active-link">
              <FaHome size={24} /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/posts" activeClassName="active-link">
              <FaLaptopCode size={24} /> Posts
            </NavLink>
          </li>
          <li>
            <NavLink to="/communities" activeClassName="active-link">
              <FaRegHandshake size={24} /> Communities
            </NavLink>
          </li>
          <li>
            <NavLink to="/me" activeClassName="active-link">
              <ImProfile size={24} /> Profile
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Tech Communities Section */}
      <div className="tech-communities">
        <h3>
          Popular Communities <FaAngleDown />
        </h3>
        <ul>
          <li>
            <NavLink to="/posts/community/1" activeClassName="active-link">
              <FaCode /> Programming
            </NavLink>
          </li>
          <li>
            <NavLink to="/posts/community/2" activeClassName="active-link">
              <FaCloud /> Cloud Computing
            </NavLink>
          </li>
          <li>
            <NavLink to="/posts/community/3" activeClassName="active-link">
              <FaLock /> Cybersecurity
            </NavLink>
          </li>
          <li>
            <NavLink to="/posts/community/4" activeClassName="active-link">
              <FaMicrochip /> Hardware Enthusiasts
            </NavLink>
          </li>
          <li>
            <NavLink to="/posts/community/5" activeClassName="active-link">
              <FaWindows /> Windows
            </NavLink>
          </li>
          <li>
            <NavLink to="/posts/community/6" activeClassName="active-link">
              <FaApple /> Apple
            </NavLink>
          </li>
        </ul>

        {/* Popular Tags Section */}
        <div className="tags">
          <h3>
            Popular Tags <FaAngleDown />
          </h3>
          <ul>
            <li>
              <NavLink to="/tags/javascript" activeClassName="active-link">
                JavaScript
              </NavLink>
            </li>
            <li>
              <NavLink to="/tags/python" activeClassName="active-link">
                Python
              </NavLink>
            </li>
            <li>
              <NavLink to="/tags/cloud" activeClassName="active-link">
                Cloud
              </NavLink>
            </li>
            <li>
              <NavLink to="/tags/cybersecurity" activeClassName="active-link">
                Cybersecurity
              </NavLink>
            </li>
          </ul>

          <div className="welcome-message">
            <h3>Thanks for using FILO!</h3>
            <p>
              Dive into a world of technology and innovation! Explore diverse
              communities, discover trending topics, and connect with
              like-minded enthusiasts. Whether you're here to learn, share, or
              network, you've come to the right place. Let’s build the future
              together!
            </p>

            <div className="faq-section">
              <h4>FAQs</h4>
              <ul>
                <li>
                  <strong>What is FILO?</strong>
                  <p>
                    FILO is a dedicated platform for tech enthusiasts—a place to
                    connect with communities, explore the latest trends, and
                    discover new opportunities in technology and computing.
                  </p>
                </li>
                <li>
                  <strong>How can I join a community?</strong>
                  <p>
                    Navigate to the "Communities" tab and click on a community
                    to explore its content and join discussions.
                  </p>
                </li>
                <li>
                  <strong>Is FILO free to use?</strong>
                  <p>Yes, FILO is completely free for all users!</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
