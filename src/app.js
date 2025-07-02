const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {
  signupValidationData,
  loginValidationData,
} = require("./utils/validation");
const PORT_NUMBER = 7777;
const SECRET_KEY = "!devCollab@765";

app.use(express.json());
app.use(cookieParser());

//add user
app.post("/signup", async (req, res) => {
  try {
    signupValidationData(req);
    const data = req.body;
    const plaintextPassword = data?.password;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(plaintextPassword, saltRounds);
    const user = new User({ ...data, password: passwordHash });
    await user.save();
    res.send("user added successfully!");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    loginValidationData(req);
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    if (passwordMatch) {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 900000),
      });
      res.send("Login successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

//get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length > 0) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(400).send("Something went wrong : " + error.message);
  }
});

//get profile
app.get("/profile", async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      throw new Error("Token not found");
    }
    const decodedData = jwt.verify(token, SECRET_KEY);
    const { _id } = decodedData;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

//get all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length > 0) {
      res.send(users);
    } else {
      res.status(404).send("Users not found");
    }
  } catch (error) {
    res.status(400).send("Something went wrong : " + error.message);
  }
});

//delete a user from database
app.delete("/user", async (req, res) => {
  const userId = req.body?.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(400).send("Deleteion failed : " + error.message);
  }
});

//update a user in a database
app.patch("/user/:userId", async (req, res) => {
  const ALLOWED_KEYS = ["age", "skills", "photoUrl", "about"];
  const userId = req.params.userId;
  const data = req.body;
  try {
    const allowedUserData = Object.keys(data).every((key) =>
      ALLOWED_KEYS.includes(key)
    );
    if (allowedUserData) {
      await User.findByIdAndUpdate(userId, data, { runValidators: true });
      res.send("User updated successfully");
    } else {
      throw new Error("user cannot be updated");
    }
  } catch (error) {
    res.status(400).send("Update failed : " + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT_NUMBER, () => {
      console.log(`listning to port ${PORT_NUMBER}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed");
  });
