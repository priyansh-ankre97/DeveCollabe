const express = require("express");
const {
  signupValidationData,
  loginValidationData,
} = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();

//add user
router.post("/signup", async (req, res) => {
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
router.post("/login", async (req, res) => {
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

router.post("/logout", async (req, res) => {
  try {
    // res.clearCookie("token");
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("Logout successful");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = router;
