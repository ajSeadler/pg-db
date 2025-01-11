const jwt = require("jsonwebtoken");
const { JWT_SECRET = "somesecretvalue" } = process.env;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded payload to req.user
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};



function requireUser(req, res, next) {
    if (!req.user) {
      console.log("req.user in requireUser middleware:", req.user);
      res.status(401);
      return next({
        name: "MissingUserError",
        message: "You must be logged in to perform this action",
      });
    }
    next();
  }
  
  //Middleware to check if user is admin. might be buggy
  // utils.js
  const isAdmin = (req, res, next) => {
    console.log("isAdmin middleware executed");
  
    const user = req.user;
    console.log("User:", user);
  
    if (user && user.is_admin) {
      next(); // User is an admin, proceed to the next middleware or route handler
    } else {
      console.log("Unauthorized. Admin privileges required.");
      res.status(403).json({ error: "Unauthorized. Admin privileges required." });
    }
  };
  
  // takes required parameters as an array, returns a middleware function that sends back a message if they're not present
  const requiredNotSent = ({ requiredParams, atLeastOne = false }) => {
    return (req, res, next) => {
      // for operations that need at least one param. Not all required.
      if (atLeastOne) {
        let numParamsFound = 0;
        for (let param of requiredParams) {
          if (req.body[param] !== undefined) {
            numParamsFound++;
          }
        }
        if (!numParamsFound) {
          next({
            name: "MissingParams",
            message: `Must provide at least one of these in body: ${requiredParams.join(
              ", "
            )}`,
          });
        } else {
          next();
        }
      } else {
        // figure out which ones are not defined, and return them
        const notSent = [];
        for (let param of requiredParams) {
          if (req.body[param] === undefined) {
            notSent.push(param);
          }
        }
        if (notSent.length)
          next({
            name: "MissingParams",
            message: `Required Parameters not sent in body: ${notSent.join(
              ", "
            )}`,
          });
        next();
      }
    };
  };
  
  module.exports = {
    requireUser,
    requiredNotSent,
    isAdmin,
    authenticateToken
  };