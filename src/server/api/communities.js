const express = require('express');
const { getAllCommunities, getCommunityById } = require('../db/communities');  // Assuming you have these functions in your db module
const communitiesRouter = express.Router();

// Get all communities
communitiesRouter.get('/', async (req, res, next) => {
  try {
    const communities = await getAllCommunities();
    res.json(communities);  // Return the list of all communities
  } catch (error) {
    next(error);
  }
});

// Get community by ID
communitiesRouter.get('/:communityId', async (req, res, next) => {
  const { communityId } = req.params;

  try {
    const community = await getCommunityById(communityId);
    if (community) {
      res.json(community);  // Return the community details
    } else {
      res.status(404).send({ message: 'Community not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = communitiesRouter;
