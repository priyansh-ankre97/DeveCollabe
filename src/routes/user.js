const express = require("express");
const { authUser } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const router = express.Router();

const POPULATE_FIELDS = "firstName lastName photoUrl about skills";

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
    res.status(400).send({ error: error.message });
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
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
