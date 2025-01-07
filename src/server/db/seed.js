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

// Function to drop the users table
const dropUsersTable = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS users;`);
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
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

// Seed the database (only for users table)
const seedDatabase = async () => {
  try {
    db.connect();
    await dropUsersTable();  // Drop the users table if it exists
    await createUsersTable(); // Create the users table
    await insertUsers();      // Insert the users data
  } catch (err) {
    console.error("Error seeding the database:", err);
  }
};

seedDatabase();
