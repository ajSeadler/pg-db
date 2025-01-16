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
} from "react-icons/fa"; // Import icons
import { Link } from "react-router-dom"; 

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
      

      {/* Tech Communities Section */}
      <div className="tech-communities">
        <h3>
          Popular Communities <FaHandshake />
        </h3>
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
          <li>
            <Link to="/posts/community/5">
              <FaWindows /> Windows
            </Link>
          </li>
          <li>
            <Link to="/posts/community/6">
              <FaApple /> Apple
            </Link>
          </li>
        </ul>

        {/* Popular Tags Section */}
        <div className="tags">
          <h3>
            Popular Tags <FaHashtag />
          </h3>
          <ul>
            <li>
              <Link to="/tags/javascript">JavaScript</Link>
            </li>
            <li>
              <Link to="/tags/python">Python</Link>
            </li>
            <li>
              <Link to="/tags/cloud">Cloud</Link>
            </li>
            <li>
              <Link to="/tags/cybersecurity">Cybersecurity</Link>
            </li>
          </ul>
          <div className="welcome-message">
  <h3>Thanks for using FILO!</h3>
  <p>
    Dive into a world of technology and innovation! Explore diverse communities, 
    discover trending topics, and connect with like-minded enthusiasts. 
    Whether you're here to learn, share, or network, you've come to the right place. 
    Let’s build the future together!
  </p>
  
  <div className="faq-section">
    <h4>FAQs</h4>
    <ul>
      <li>
        <strong>What is FILO?</strong>
        <p>
        FILO is a dedicated platform for tech enthusiasts—a place to connect with communities, explore the latest trends, and discover new opportunities in technology and computing.
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
        <p>
          Yes, FILO is completely free for all users!
        </p>
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