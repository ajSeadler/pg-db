import React, { useState, useEffect } from 'react';
import { FaRegHandshake, FaLaptopCode } from 'react-icons/fa'; 
import Login from './Login'; 
import Sidebar from './Sidebar'; 

const HomePage = () => {
  // Initialize state variables
  const [articles, setArticles] = useState([]); // Ensure it's initialized as an empty array
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);      // Track any errors

  // Fetch tech articles on component mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          'https://newsapi.org/v2/top-headlines?category=technology&pageSize=20&apiKey=be83d9d1677b4efb856608df4ba48bf7'
        );
        const data = await response.json();
    
        if (data && data.articles) {
          const validArticles = data.articles.filter(
            article => article.title && article.url
          );
          setArticles(validArticles);
        } else {
          setError('No articles found');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch articles');
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, []);

  return (
    <div className="homepage-container">
      <main className="homepage-main">
        <Sidebar /> {/* Sidebar Component */}

        <div className="feed">
          <div className="feed-content">
            <div className="flex-container">
              <div className="site-description">
                <h2>Welcome to Filo.</h2>
                <p><strong>First in last out.</strong> Filo is the go-to platform for tech enthusiasts to stay updated on the latest news, trends, and innovations in the tech world. Join the community and discover what’s happening in technology right now.</p>
                <button className="cta-button">
                  <FaRegHandshake /> Join Today
                </button>
              </div>

              <div className="site-description">
                <Login />
              </div>
            </div>

            <div className="cta-section">
              <h2>What's Trending?</h2>
              <p>Discover what's happening in the tech world with real-time articles and insights.</p>
              <button className="cta-button">
                <FaLaptopCode /> See the Latest Insights
              </button>
            </div>
            <div className="recent-topics">
              <h2>Don't Know What To Talk About?</h2>
              <p style={{marginBottom:'3%'}}>Take a peek at the latest tech srticles below!</p>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <ul>
                  {articles.map((article, index) => (
                    <li key={index} className="article-item">
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        <div className="article-image">
                          {article.urlToImage ? (
                            <img src={article.urlToImage} alt={article.title} />
                          ) : (
                            <p>No image available</p>
                          )}
                        </div>
                        <div className="article-details">
                          <h3>{article.title}</h3>
                          <p>{article.description ? article.description : 'No description available'}</p>
                          <small>Published on {new Date(article.publishedAt).toLocaleDateString()}</small>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
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
