import React, { useState, useEffect } from "react";
import Parser from "rss-parser";

const RSSJobFeed = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRSSFeed = async () => {
      try {
        const parser = new Parser();
        const feed = await parser.parseURL(
          "https://jobicy.com/?feed=job_feed&job_categories=marketing&job_types=full-time&search_region=usa"
        );
        setJobs(feed.items || []);
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRSSFeed();
  }, []);

  return (
    <div>
      <h1>Remote Job Listings (RSS)</h1>
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <ul>
          {jobs.map((job, index) => (
            <li key={index}>
              <a href={job.link} target="_blank" rel="noopener noreferrer">
                {job.title}
              </a>
              <p>{job.pubDate}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RSSJobFeed;
