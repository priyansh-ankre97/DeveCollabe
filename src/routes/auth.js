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
    res.json({ message: "Signup successful", data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
      res.json({ message: "Login successful", data: user });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/logout", async (req, res) => {
  try {
    // res.clearCookie("token");
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send({ message: "Logout successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
