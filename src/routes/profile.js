const express = require("express");
const router = express.Router();
const { authUser } = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const {
  profileEditValidationData,
  strongpasswordValidationData,
} = require("../utils/validation");

//get profile
router.get("/profile/view", authUser, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

//edit profile
router.patch("/profile/edit", authUser, async (req, res) => {
  try {
    profileEditValidationData(req);
    const loggedInUser = req.user;
    const data = req.body;
    Object.keys(data).forEach((key) => {
      loggedInUser[key] = data[key];
    });
    await loggedInUser.save();
    res.json({ message: "Profile updated successfully", data: loggedInUser });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

//change password
router.patch("/profile/password", authUser, async (req, res) => {
  try {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;
    const passwordMatch = await user.validatePassword(oldPassword);
    if (!passwordMatch) {
      throw new Error("Old password is incorrect");
    }
    strongpasswordValidationData(oldPassword, newPassword);
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);
    user.password = passwordHash;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

module.exports = router;
