const db = require("./client");  // Assuming you have a 'client.js' file that handles DB connection

// Function to get all posts with user names and community names
const getAllPosts = async ({ page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;  // Calculate the offset for pagination

  try {
    // Ensure we use INNER JOIN to avoid posts without community
    const { rows } = await db.query(
      `SELECT posts.id, posts.content, posts.created_at, posts.user_id, users.name AS author_name, communities.name AS community_name
       FROM posts
       JOIN users ON posts.user_id = users.id
       LEFT JOIN communities ON posts.community_id = communities.id  -- LEFT JOIN allows posts without a community
       ORDER BY posts.created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    return rows;  // Return the posts with user names and community names
  } catch (error) {
    console.error("Error getting posts:", error);
    throw error;  // Propagate the error if the query fails
  }
};

// Function to get posts by a specific community
const getPostsByCommunity = async ({ page = 1, limit = 10, communityId }) => {
  const offset = (page - 1) * limit;  // Calculate the offset for pagination

  try {
    // Ensure we use INNER JOIN to avoid posts without community
    const { rows } = await db.query(
      `SELECT posts.id, posts.content, posts.created_at, posts.user_id, users.name AS author_name, communities.name AS community_name
       FROM posts
       JOIN users ON posts.user_id = users.id
       LEFT JOIN communities ON posts.community_id = communities.id  -- LEFT JOIN allows posts without a community
       WHERE posts.community_id = $1  -- Filter posts by community ID
       ORDER BY posts.created_at DESC
       LIMIT $2 OFFSET $3`,
      [communityId, limit, offset]  // Pass the communityId to the query
    );
    return rows;  // Return the posts with user names and community names
  } catch (error) {
    console.error("Error getting posts by community:", error);
    throw error;  // Propagate the error if the query fails
  }
};

// Function to get a single post by ID
const getPostById = async (postId) => {
  try {
    const { rows } = await db.query(
      `SELECT posts.id, posts.content, posts.created_at, posts.user_id, users.name AS author_name, communities.name AS community_name
       FROM posts
       JOIN users ON posts.user_id = users.id
       LEFT JOIN communities ON posts.community_id = communities.id
       WHERE posts.id = $1`,
      [postId]
    );
    return rows[0];  // Return the first post (since we're fetching by ID)
  } catch (error) {
    console.error("Error getting post:", error);
    throw error;
  }
};

module.exports = {
  getAllPosts,
  getPostsByCommunity,
  getPostById,  // Export the new function
};

