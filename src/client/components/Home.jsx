import React from 'react';
import { FaRegHandshake, FaLaptopCode } from 'react-icons/fa'; // Import icons from React Icons
import Login from './Login'; // Ensure you have the Login component imported
import Sidebar from './Sidebar'; // Import Sidebar component

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="header-logo">
          <h1>filo.</h1>
        </div>
        <nav className="nav-bar">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>
      
      <main className="homepage-main">
        {/* Sidebar */}
        <Sidebar /> {/* Use the Sidebar component here */}

        {/* Feed Area */}
        <div className="feed">
          <div className="feed-content">
            {/* Flex container for Login and Site Description */}
            <div className="flex-container">
                {/* Site Description and Join CTA */}
              <div className="site-description">
                <h2>Welcome to filo.</h2>
                <p>First in last out. Filo is the go-to platform for tech enthusiasts. Join our community to discuss the latest trends in technology, programming, gadgets, and more. Get answers, share knowledge, and connect with others.</p>
                <button className="cta-button">
                  <FaRegHandshake /> Join Today
                </button>
              </div>
              {/* Login Form Section */}
              <div className="login-section">
                {/* <h2>Login to Join the Discussion</h2> */}
                <Login />
              </div>
            </div>

            {/* Call to Action Section */}
            <div className="cta-section">
              <h2>What's Trending?</h2>
              <p>Join the conversation on the latest tech topics.</p>
              <button className="cta-button">
                <FaLaptopCode /> Join the Discussion
              </button>
            </div>

            {/* Recent Topics */}
            <div className="recent-topics">
              <h2>Recent Topics</h2>
              <ul>
                <li><a href="#">How AI is Changing the Future of Tech</a></li>
                <li><a href="#">The Best Programming Languages to Learn in 2025</a></li>
                <li><a href="#">Why Cloud Computing is Here to Stay</a></li>
                <li><a href="#">Debunking Common Myths About Cybersecurity</a></li>
              </ul>
            </div>

            {/* Popular Discussions */}
            <div className="popular-discussions">
              <h2>Popular Discussions</h2>
              <ul>
                <li><a href="#">What Are the Best Gadgets of 2025?</a></li>
                <li><a href="#">Building a Custom PC: A Step-by-Step Guide</a></li>
                <li><a href="#">The Future of Virtual Reality in Gaming</a></li>
                <li><a href="#">How to Build Your First Website: A Beginner’s Guide</a></li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="homepage-footer">
        <p>© 2025 Tech Forum. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
