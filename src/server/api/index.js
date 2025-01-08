const express = require("express");
const apiRouter = express.Router();

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const volleyball = require("volleyball");
const { getUserById } = require("../db");
apiRouter.use(volleyball);

// TO BE COMPLETED - set `req.user` if possible, using token sent in the request header
apiRouter.use(async (req, res, next) => {
  const auth = req.header("Authorization");
  console.log("Authorization Header:", auth); // Log the header to see if token is being passed

  if (!auth) {
    return next(); // No token, continue without setting user
  }

  if (auth.startsWith("Bearer ")) {
    const token = auth.slice(7); // Extract token part
    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      const id = parsedToken.id;

      // Fetch user data based on id
      const user = await getUserById(id);
      if (user) {
        req.user = user; // Set the user data in the request
        return next();
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error parsing token:", error); // Log any errors with token parsing
      return res.status(401).json({ message: "Invalid token" }); // Unauthorized if token is invalid
    }
  } else {
    return next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with Bearer `,
    });
  }
});


apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }

  next();
});

// Add users router
const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

// Add posts router
const postsRouter = require("./posts");
apiRouter.use("/posts", postsRouter);

const communitiesRouter = require("./communities");  // Import the communities router
apiRouter.use("/communities", communitiesRouter); 

module.exports = apiRouter;
