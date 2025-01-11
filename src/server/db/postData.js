const { faker } = require('@faker-js/faker');

function generatePostData(numPosts) {
  const postData = [];
  const communityIds = [1, 2, 3, 4, 5, 6]; // Keep community IDs within range
  const userIds = [1, 2, 3, 4, 5]; // Keep user IDs within range

  for (let i = 0; i < numPosts; i++) {
    postData.push({
      user_id: faker.helpers.arrayElement(userIds), // Random user ID
      content: faker.hacker.phrase(), // Random content related to tech
      community_id: faker.helpers.arrayElement(communityIds), // Random community ID
    });
  }

  return postData;
}

// Generate 30 posts
const postData = generatePostData(200);
console.log(postData);

module.exports = postData;
