const express = require("express");
const { authUser } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const router = express.Router();

router.get("/user/request", authUser, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    });
    res.json({
      message: "Connection request fetched successfully",
      data: connectionRequest,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
