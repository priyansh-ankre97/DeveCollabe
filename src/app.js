const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const {
  signupValidationData,
  loginValidationData,
} = require("./utils/validation");
const { authUser } = require("./middlewares/auth");
const PORT_NUMBER = 7777;

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

//login user
app.post("/login", async (req, res) => {
  try {
    loginValidationData(req);
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const passwordMatch = await user.validatePassword(password);
    if (passwordMatch) {
      //create token
      const token = await user.getJwtToken();
      //send cookie
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

//get profile
app.get("/profile", authUser, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

//get connection request
app.post("/getConnectionRequest", authUser, async (req, res) => {
  try {
    res.send("connection request sent by: " + req.user?.firstName);
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
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
