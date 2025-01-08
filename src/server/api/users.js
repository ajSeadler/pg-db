const express = require("express");
const usersRouter = express.Router();
const {
  getAllUsers,
  createUser,
  getUser,
  getUserByEmail,
  getUserById,
} = require("../db");
const { requireUser } = require("./utils");
const { JWT_SECRET = "somesecretvalue" } = process.env;
const jwt = require("jsonwebtoken");

//

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.send({
      users,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});
//NEED TO FIX THIS ROUTE. PROFILE PAGE WORKS WITHOUT IT BUT NOT WITH IT
// usersRouter.get("/:id", async (req, res, next) => {
//   try {
//     const userId = parseInt(req.params.id, 10); // Ensure userId is an integer
//     if (isNaN(userId)) {
//       return res.status(400).json({ message: "Invalid user ID" });
//     }

//     const user = await getUserById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.send({
//       user,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both an email and password",
    });
  }
  try {
    const user = await getUser({ email, password });
    console.log("User:", user);
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );

      res.send({
        message: "Login successful!",
        token,
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (err) {
    next(err);
  }
});

usersRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    res.send(req.user); // Make sure this sends the full user data
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  const { name, email, password, first_name, last_name } = req.body;

  try {
    const _user = await getUserByEmail(email);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user with that email already exists",
      });
    }

    const user = await createUser({
      name,
      email,
      password,
      first_name,
      last_name,
    });

    const token = jwt.sign(
      {
        id: user.id,
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "Sign up successful!",
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;