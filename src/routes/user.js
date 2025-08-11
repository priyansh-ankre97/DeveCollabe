const express = require("express");
const { authUser } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const router = express.Router();

const POPULATE_FIELDS = "firstName lastName photoUrl about skills gender age";

router.get("/user/request", authUser, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", POPULATE_FIELDS);
    res.json({
      message: "Connection request fetched successfully",
      data: connectionRequest,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/user/connections", authUser, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", POPULATE_FIELDS)
      .populate("toUserId", POPULATE_FIELDS);
    const data = connectionRequest.map((request) =>
      request.toUserId.equals(loggedInUser._id)
        ? request.fromUserId
        : request.toUserId
    );
    res.json({
      message: "Connection request fetched successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/user/feed", authUser, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = req.query.page || 1;
    let limit = req.query.limit || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    });
    const hideUserFromFeed = new Set();
    connectionRequest.forEach((request) => {
      hideUserFromFeed.add(request.fromUserId);
      hideUserFromFeed.add(request.toUserId);
    });
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(POPULATE_FIELDS)
      .skip(skip)
      .limit(limit);
    res.json({
      message: "Connection request fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
