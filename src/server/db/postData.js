const { faker } = require("@faker-js/faker");
const { UniqueEnforcer } = require("enforce-unique");

const uniqueEnforcer = new UniqueEnforcer();

function generatePostData(numPosts) {
  const postData = [];
  const communityIds = [1, 2, 3, 4, 5, 6]; // Community IDs within range
  const userIds = [1, 2, 3, 4, 5]; // User IDs within range
  const availableTags = [
    "javascript",
    "nodejs",
    "react",
    "cybersecurity",
    "postgresql",
    "databases",
    "webdev",
    "backend",
    "frontend",
    "fullstack",
  ]; // Predefined list of tags

  for (let i = 0; i < numPosts; i++) {
    // Ensure unique tags are applied to each post
    const tags = uniqueEnforcer.enforce(() =>
      faker.helpers.arrayElements(availableTags, faker.number.int({ min: 1, max: 3 }))
    );

    postData.push({
      user_id: faker.helpers.arrayElement(userIds), // Random user ID
      content: faker.hacker.phrase(), // Random content related to tech
      community_id: faker.helpers.arrayElement(communityIds), // Random community ID
      tags, // Unique tags applied to the post
    });
  }

  return postData;
}

// Generate 200 posts
const postData = generatePostData(200);
console.log(postData);

module.exports = postData;
