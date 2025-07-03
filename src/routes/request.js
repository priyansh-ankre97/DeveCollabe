const express = require("express");
const router = express.Router();
const { authUser } = require("../middlewares/auth");

//get connection request
router.post("/sendConnectionRequest", authUser, async (req, res) => {
  try {
    res.send("connection request sent by: " + req.user?.firstName);
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

module.exports = router;
