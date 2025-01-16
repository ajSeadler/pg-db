const express = require("express");
const postsRouter = express.Router();
const { getAllPosts, getPostsByCommunity, getPostById, getTrendingCommunities, createPost } = require("../db/posts");
const { requireUser } = require("./utils"); // Import the requireUser function

// Get all posts (for viewing) with pagination
postsRouter.get("/", async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const posts = await getAllPosts({ page: Number(page), limit: Number(limit) });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// Get trending communities
postsRouter.get("/trending", async (req, res, next) => {
  try {
    const trending = await getTrendingCommunities();
    res.json(trending);
  } catch (error) {
    console.error("Error fetching trending communities:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get posts by community with pagination
postsRouter.get("/community/:communityId", async (req, res, next) => {
  const { communityId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const posts = await getPostsByCommunity({
      communityId: Number(communityId),
      page: Number(page),
      limit: Number(limit),
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// Get a single post by ID
postsRouter.get("/:postId", async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await getPostById(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
});

// Create a new post (requires authentication)
postsRouter.post("/", requireUser, async (req, res, next) => {
  const { content, communityId, tags } = req.body;
  const userId = req.user.id; // Assuming the user is added to `req.user` by `requireUser`

  // Validate input
  if (!content || !communityId) {
    return res.status(400).send("Missing required fields: content or communityId.");
  }

  try {
    const newPost = await createPost({ userId, content, communityId, tags });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    next(error);
  }
});

module.exports = postsRouter;
