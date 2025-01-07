const db = require("./client");  // Assuming you have a 'client.js' file that handles DB connection

// Function to get all communities
async function getAllCommunities() {
  const result = await db.query('SELECT * FROM communities');
  return result.rows;
}

// Function to get community by ID
async function getCommunityById(communityId) {
  const result = await db.query('SELECT * FROM communities WHERE id = $1', [communityId]);
  return result.rows[0];  // Returns the first community, or undefined if not found
}

module.exports = {
  getAllCommunities,
  getCommunityById,
  // other functions like getUserById, etc.
};
