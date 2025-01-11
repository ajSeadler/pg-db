import React, { useEffect, useState } from "react";
import { ResponsiveAreaBump } from "@nivo/bump"; // Import Nivo Area Bump chart

const TrendingCommunitiesChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingCommunities = async () => {
      try {
        const response = await fetch("/api/posts/trending"); // Adjust the endpoint as needed
        if (!response.ok) {
          throw new Error("Failed to fetch trending communities");
        }
        const data = await response.json();

        // Format the data into the required shape for Area Bump
        const formattedData = data.map((community, index) => {
          const postCount = parseInt(community.post_count);

          // Simulate post count changes across time intervals
          const randomFactor = (index + 1) * 1; // Example: Random factor for variation across months
          
          return {
            id: community.name, // Use community name as ID
            data: [
              { x: "January", y: postCount },
              { x: "June", y: postCount + randomFactor }, // Slight variation
              { x: "December", y: postCount + randomFactor * 2 }, // More variation
            ],
          };
        });

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching trending communities:", error);
        setError("Unable to load trending communities at this time.");
      }
    };

    fetchTrendingCommunities();
  }, []); // The empty array means this effect runs only once, on mount

  if (error) return <p>{error}</p>;
  if (!chartData) return <p>Loading...</p>;

  return (
    <div
      style={{
        background: "#2c3e50",
        borderRadius: "15px",
        padding: "20px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        maxWidth: "90%",
        margin: "auto",
        marginBottom: "30px",
        height: "400px", // Set height for the chart
        overflow: "hidden", // Ensures overflow doesn't spill outside the div
      }}
    >
      

      <ResponsiveAreaBump
        data={chartData}
        margin={{ top: 40, right: 130, bottom: 40, left: 130 }}
        spacing={8}
        colors={{ scheme: "nivo" }}
        blendMode="multiply"
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "Programming", // Adjust based on community name
            },
            id: "dots",
          },
          {
            match: {
              id: "Cybersecurity", // Adjust based on community name
            },
            id: "lines",
          },
        ]}
        startLabel="id"
        endLabel="id"
        tooltip={({ id, value, color }) => (
          <div
            style={{
              padding: "5px 10px",
              background: color,
              color: "#fff",
              borderRadius: "5px",
            }}
          >
            <strong>{id}</strong>: {value}
          </div>
        )}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: -36,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45, // Rotate labels to make them fit better
          legend: "",
          legendPosition: "middle",
          legendOffset: 32,
        }}
      />
    </div>
  );
};

export default TrendingCommunitiesChart;
