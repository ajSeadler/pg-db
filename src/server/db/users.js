const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createUser = async({ name, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [user ] } = await db.query(`
        INSERT INTO users(name, email, password)
        VALUES($1, $2, $3)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [name, email, hashedPassword]);

        return user;
    } catch (err) {
        throw err;
    }
}

const getUser = async({email, password}) => {
    if(!email || !password) {
        return;
    }
    try {
        const user = await getUserByEmail(email);
        if(!user) return;
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if(!passwordsMatch) return;
        delete user.password;
        return user;
    } catch (err) {
        throw err;
    }
}

const getUserByEmail = async(email) => {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE email=$1;`, [ email ]);

        if(!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}

const getAllUsers = async () => {
    try {
        const { rows } = await db.query('SELECT * FROM users');
        return rows;
    } catch (error) {
        throw error;
    }
}

const getReviewsByUserId = async (userId) => {
    try {
      const { rows } = await db.query(
        `
        SELECT *
        FROM reviews
        WHERE user_id = $1;
        `,
        [userId]
      );
  
      return rows;
    } catch (error) {
      throw error;
    }
  };


  const getUserById = async (userId) => {
    try {
      const {
        rows: [user],
      } = await db.query(
        `
          SELECT *
          FROM users
          WHERE id = $1;
          `,
        [userId]
      );
  
      if (!user) return null;
  
      // Omitting password from the user object
      const sanitizedUser = { ...user };
      delete sanitizedUser.password;
  
      return sanitizedUser;
    } catch (error) {
      throw error;
    }
  };
  
  const getReviewsWithRestaurantDetails = async (userId) => {
    try {
      const reviews = await getReviewsByUserId(userId);
  
      const reviewsWithRestaurantDetails = await Promise.all(reviews.map(async (review) => {
        const restaurant = await getRestaurantById(review.restaurant_id);
        return {
          ...review,
          restaurant_name: restaurant.name || 'Unknown Restaurant',
        };
      }));
  
      return reviewsWithRestaurantDetails;
    } catch (error) {
      throw error;
    }
  };
  




module.exports = {
    createUser,
    getUser,
    getUserByEmail,
    getReviewsByUserId,
    getAllUsers, 
    getUserById,
    getReviewsWithRestaurantDetails
};