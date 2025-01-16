const db = require("./client");
const { createUser } = require("./users");
const userData = require("./userData"); // Import user data
const communityData = require("./communityData"); // Import community data
const postData = require("./postData"); // Import post data

// Drop tables
const dropTables = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS post_tags CASCADE;`);
    await db.query(`DROP TABLE IF EXISTS tags CASCADE;`);
    await db.query(`DROP TABLE IF EXISTS posts CASCADE;`);
    await db.query(`DROP TABLE IF EXISTS users CASCADE;`);
    await db.query(`DROP TABLE IF EXISTS communities CASCADE;`);
    console.log("Tables dropped successfully.");
  } catch (err) {
    console.error("Error dropping tables:", err);
    throw err;
  }
};

// Create tables
const createTables = async () => {
  try {
    // Communities table
    await db.query(`
      CREATE TABLE communities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT
      );
    `);

    // Users table
    await db.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) DEFAULT 'name',
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT FALSE
      );
    `);

    // Posts table
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

    // Tags table
    await db.query(`
      CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
      );
    `);

    // Post-Tags table
    await db.query(`
      CREATE TABLE post_tags (
        post_id INT REFERENCES posts(id) ON DELETE CASCADE,
        tag_id INT REFERENCES tags(id) ON DELETE CASCADE,
        PRIMARY KEY (post_id, tag_id)
      );
    `);

    console.log("Tables created successfully.");
  } catch (err) {
    console.error("Error creating tables:", err);
    throw err;
  }
};

// Insert communities
const insertCommunities = async () => {
  try {
    for (const community of communityData) {
      await db.query(
        `INSERT INTO communities (name, description) VALUES ($1, $2)`,
        [community.name, community.description]
      );
      console.log(`Community inserted: ${community.name}`);
    }
  } catch (err) {
    console.error("Error inserting communities:", err);
    throw err;
  }
};

// Insert users
const insertUsers = async () => {
  try {
    for (const user of userData) {
      const isEmily = user.name === "Emily Johnson";
      const createdUser = await createUser({
        name: user.name,
        email: user.email,
        password: user.password,
        is_admin: isEmily,
      });
      console.log("User inserted:", createdUser);

      if (isEmily) {
        console.log("Making Emily an admin...");
        await db.query("UPDATE users SET is_admin = true WHERE id = $1", [
          createdUser.id,
        ]);
      }
    }
    console.log("Seed users inserted successfully.");
  } catch (err) {
    console.error("Error inserting users:", err);
    throw err;
  }
};

// Insert tags
const insertTags = async (tags) => {
  try {
    const tagIds = [];
    for (const tag of tags) {
      const result = await db.query(
        `INSERT INTO tags (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING id`,
        [tag]
      );
      if (result.rows.length > 0) {
        tagIds.push(result.rows[0].id);
      } else {
        const existingTag = await db.query(`SELECT id FROM tags WHERE name = $1`, [
          tag,
        ]);
        tagIds.push(existingTag.rows[0].id);
      }
    }
    return tagIds;
  } catch (err) {
    console.error("Error inserting tags:", err);
    throw err;
  }
};

// Link tags to posts
const insertPostTags = async (postId, tagIds) => {
  try {
    for (const tagId of tagIds) {
      await db.query(
        `INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2)`,
        [postId, tagId]
      );
    }
  } catch (err) {
    console.error("Error linking tags to posts:", err);
    throw err;
  }
};

// Insert posts
const insertPosts = async () => {
  try {
    for (const post of postData) {
      const result = await db.query(
        `INSERT INTO posts (user_id, content, community_id)
         VALUES ($1, $2, $3) RETURNING id`,
        [post.user_id, post.content, post.community_id]
      );
      const postId = result.rows[0].id;

      if (post.tags && post.tags.length > 0) {
        const tagIds = await insertTags(post.tags); // Insert tags and get IDs
        await insertPostTags(postId, tagIds); // Link tags to the post
      }
    }
    console.log("Posts inserted successfully.");
  } catch (err) {
    console.error("Error inserting posts:", err);
    throw err;
  }
};

// Seed database
const seedDatabase = async () => {
  try {
    db.connect();

    await dropTables();
    await createTables();

    await insertCommunities();
    await insertUsers();
    await insertPosts();

    console.log("Database seeding completed successfully.");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    db.end();
  }
};

// Execute seeding
seedDatabase();
