const db = require("./client"); // Assuming you have a 'client.js' file that handles DB connection

// Function to get all posts with user names, community names, and tags
const getAllPosts = async ({ page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;

  try {
    const { rows } = await db.query(
      `SELECT 
         posts.id, 
         posts.content, 
         posts.created_at, 
         posts.user_id, 
         users.name AS author_name, 
         communities.name AS community_name,
         COALESCE(json_agg(tags.name) FILTER (WHERE tags.id IS NOT NULL), '[]') AS tags
       FROM posts
       JOIN users ON posts.user_id = users.id
       LEFT JOIN communities ON posts.community_id = communities.id
       LEFT JOIN post_tags ON posts.id = post_tags.post_id
       LEFT JOIN tags ON post_tags.tag_id = tags.id
       GROUP BY posts.id, users.name, communities.name
       ORDER BY posts.created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    return rows;
  } catch (error) {
    console.error("Error getting posts:", error);
    throw error;
  }
};

// Function to get posts by a specific community with tags
const getPostsByCommunity = async ({ communityId, page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit; // Calculate offset for pagination

  try {
    const { rows } = await db.query(
      `SELECT 
         posts.id, 
         posts.content, 
         posts.created_at, 
         posts.user_id, 
         users.name AS author_name, 
         communities.name AS community_name,
         COALESCE(json_agg(tags.name) FILTER (WHERE tags.id IS NOT NULL), '[]') AS tags
       FROM posts
       JOIN users ON posts.user_id = users.id
       LEFT JOIN communities ON posts.community_id = communities.id
       LEFT JOIN post_tags ON posts.id = post_tags.post_id
       LEFT JOIN tags ON post_tags.tag_id = tags.id
       WHERE posts.community_id = $1
       GROUP BY posts.id, users.name, communities.name
       ORDER BY posts.created_at DESC
       LIMIT $2 OFFSET $3`,
      [communityId, limit, offset]
    );
    return rows;
  } catch (error) {
    console.error("Error getting posts by community:", error);
    throw error;
  }
};

// Function to get a single post by ID with tags
const getPostById = async (postId) => {
  try {
    const { rows } = await db.query(
      `SELECT 
         posts.id, 
         posts.content, 
         posts.created_at, 
         posts.user_id, 
         users.name AS author_name, 
         communities.name AS community_name,
         COALESCE(json_agg(tags.name) FILTER (WHERE tags.id IS NOT NULL), '[]') AS tags
       FROM posts
       JOIN users ON posts.user_id = users.id
       LEFT JOIN communities ON posts.community_id = communities.id
       LEFT JOIN post_tags ON posts.id = post_tags.post_id
       LEFT JOIN tags ON post_tags.tag_id = tags.id
       WHERE posts.id = $1
       GROUP BY posts.id, users.name, communities.name`,
      [postId]
    );
    return rows[0];
  } catch (error) {
    console.error("Error getting post:", error);
    throw error;
  }
};

// Function to get trending communities
const getTrendingCommunities = async () => {
  try {
    const { rows } = await db.query(
      `SELECT 
         communities.id, 
         communities.name, 
         COUNT(posts.id) AS post_count
       FROM communities
       LEFT JOIN posts ON posts.community_id = communities.id
       GROUP BY communities.id, communities.name
       ORDER BY post_count DESC
       LIMIT 10`
    );
    return rows;
  } catch (error) {
    console.error("Error getting trending communities:", error);
    throw error;
  }
};

// Function to get posts by a specific user with tags
const getPostsByUser = async (userId) => {
  try {
    const { rows } = await db.query(
      `SELECT 
         posts.id, 
         posts.content, 
         posts.created_at, 
         posts.community_id, 
         users.name AS author_name, 
         communities.name AS community_name,
         COALESCE(json_agg(tags.name) FILTER (WHERE tags.id IS NOT NULL), '[]') AS tags
       FROM posts
       JOIN users ON posts.user_id = users.id
       LEFT JOIN communities ON posts.community_id = communities.id
       LEFT JOIN post_tags ON posts.id = post_tags.post_id
       LEFT JOIN tags ON post_tags.tag_id = tags.id
       WHERE posts.user_id = $1
       GROUP BY posts.id, users.name, communities.name
       ORDER BY posts.created_at DESC`,
      [userId]
    );
    return rows;
  } catch (error) {
    console.error("Error getting posts by user:", error);
    throw error;
  }
};

// Function to create a new post
const createPost = async ({ userId, content, communityId, tags = [] }) => {
  try {
    // Insert the post into the database
    const { rows } = await db.query(
      `INSERT INTO posts (user_id, content, community_id) 
       VALUES ($1, $2, $3) 
       RETURNING id, created_at`,
      [userId, content, communityId]
    );

    const postId = rows[0].id;

    // If tags are provided, insert them and associate with the post
    if (tags.length > 0) {
      // Insert tags and get their IDs
      const tagIds = [];
      for (const tag of tags) {
        const tagResult = await db.query(
          `INSERT INTO tags (name) 
           VALUES ($1) 
           ON CONFLICT (name) DO NOTHING 
           RETURNING id`,
          [tag]
        );

        if (tagResult.rows.length > 0) {
          tagIds.push(tagResult.rows[0].id);
        } else {
          const existingTag = await db.query(
            `SELECT id FROM tags WHERE name = $1`,
            [tag]
          );
          tagIds.push(existingTag.rows[0].id);
        }
      }

      // Link tags to the post
      for (const tagId of tagIds) {
        await db.query(
          `INSERT INTO post_tags (post_id, tag_id) 
           VALUES ($1, $2)`,
          [postId, tagId]
        );
      }
    }

    return { id: postId, createdAt: rows[0].created_at };
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

module.exports = {
  getAllPosts,
  getPostsByCommunity,
  getPostById,
  getTrendingCommunities,
  getPostsByUser,
  createPost
};
