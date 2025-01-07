const db = require("./client");
const { createUser } = require("./users");

// Users data array
const users = [
  {
    name: "Emily Johnson",
    email: "emily@example.com",
    password: "securepass",
    is_admin: true,
  },
  {
    name: "Liu Wei",
    email: "liu@example.com",
    password: "strongpass",
  },
  {
    name: "Isabella García",
    email: "bella@example.com",
    password: "pass1234",
  },
  {
    name: "Mohammed Ahmed",
    email: "mohammed@example.com",
    password: "mysecretpassword",
  },
  {
    name: "John Smith",
    email: "john@example.com",
    password: "password123",
  },
];

// Communities data array
const communities = [
  { name: 'Programming', description: 'Discussions about coding and software development' },
  { name: 'Cloud Computing', description: 'Explore cloud technologies and their applications' },
  { name: 'Cybersecurity', description: 'Discussions about securing systems and networks' },
  { name: 'Computer Hardware', description: 'All things related to computer components and hardware' },
  { name: 'Windows', description: 'For everything about Microsoft Windows OS' },
  { name: 'Mac', description: 'Discussions related to Apple Mac products and macOS' },
];

// Updated Posts data array with 10 posts
const posts = [
  { user_id: 1, content: "Excited about the latest advancements in AI!", community_id: 1 }, // Programming
  { user_id: 2, content: "Just built my first custom PC. Feeling accomplished!", community_id: 4 }, // Computer Hardware
  { user_id: 3, content: "The best programming languages for 2025, any thoughts?", community_id: 1 }, // Programming
  { user_id: 4, content: "I think cloud computing will dominate in the next few years.", community_id: 2 }, // Cloud Computing
  { user_id: 5, content: "Cybersecurity is becoming more important every day. Stay safe!", community_id: 3 }, // Cybersecurity
  { user_id: 1, content: "Exploring the latest updates in AI tools and frameworks.", community_id: 1 }, // Programming
  { user_id: 2, content: "Just upgraded my computer’s RAM and CPU, what’s your build?", community_id: 4 }, // Computer Hardware
  { user_id: 5, content: "Why the cloud is the future for businesses and startups.", community_id: 2 }, // Cloud Computing
  { user_id: 5, content: "What are the best practices for securing a home network?", community_id: 3 }, // Cybersecurity
  { user_id: 3, content: "Looking for advice on the best IDE for JavaScript development.", community_id: 1 }, // Programming
];


// Function to drop the posts table
const dropPostsTable = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS posts CASCADE;`); // Drop posts table and dependent objects
  } catch (err) {
    throw err;
  }
};

// Function to drop the users table
const dropUsersTable = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS users CASCADE;`); // Drop users table and dependent objects
  } catch (err) {
    throw err;
  }
};

// Function to drop the communities table
const dropCommunitiesTable = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS communities CASCADE;`); // Drop communities table and dependent objects
  } catch (err) {
    throw err;
  }
};

// Function to create the communities table
const createCommunitiesTable = async () => {
  try {
    await db.query(`
      CREATE TABLE communities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT
      );
    `);
  } catch (err) {
    throw err;
  }
};

// Function to create the users table
const createUsersTable = async () => {
  try {
    await db.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) DEFAULT 'name',
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT FALSE
      );
    `);
  } catch (err) {
    throw err;
  }
};

// Function to create the posts table
const createPostsTable = async () => {
  try {
    await db.query(`
      CREATE TABLE posts (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        community_id INT REFERENCES communities(id) ON DELETE SET NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (err) {
    throw err;
  }
};

// Insert communities into the table
const insertCommunities = async () => {
  try {
    for (const community of communities) {
      await db.query(
        `INSERT INTO communities (name, description) VALUES ($1, $2)`,
        [community.name, community.description]
      );
      console.log(`Community inserted: ${community.name}`);
    }
  } catch (err) {
    console.error("Error inserting communities:", err);
  }
};

// Insert users into the table
const insertUsers = async () => {
  try {
    for (const [index, user] of users.entries()) {
      const isEmily = user.name === "Emily Johnson";
      const createdUser = await createUser({
        name: user.name,
        email: user.email,
        password: user.password,
        is_admin: isEmily, // Set is_admin to true for Emily Johnson
      });

      console.log("User inserted:", createdUser);

      if (isEmily) {
        console.log("Making Emily an admin...");
        await db.query("UPDATE users SET is_admin = true WHERE id = $1", [createdUser.id]);
      }
    }
    console.log("Seed users inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed users:", error);
  }
};

// Insert posts into the table
const insertPosts = async () => {
  try {
    for (const post of posts) {
      await db.query(`
        INSERT INTO posts (user_id, content, community_id)
        VALUES ($1, $2, $3)
      `, [post.user_id, post.content, post.community_id]);

      console.log("Post inserted:", post);
    }
    console.log("Seed posts data inserted successfully.");
  } catch (err) {
    console.error("Error inserting posts data:", err);
  }
};

// Seed the database (users, communities, and posts tables)
const seedDatabase = async () => {
  try {
    db.connect();

    // Drop tables in correct order
    await dropPostsTable();      // Drop posts table first
    await dropUsersTable();      // Then drop users table
    await dropCommunitiesTable(); // Finally drop communities table

    // Create the tables and insert data as before
    await createCommunitiesTable();
    await insertCommunities();
    await createUsersTable();
    await insertUsers();
    await createPostsTable();
    await insertPosts();

    console.log("Database seeding completed successfully.");
  } catch (err) {
    console.error("Error seeding the database:", err);
  }
};

// Call the seedDatabase function to seed the data
seedDatabase();
