const express = require("express");
const router = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { authUser } = require("../middlewares/auth");

//send connection request
router.post("/request/:status/:toUserId", authUser, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    const ALLOWED_FIELDS = ["interested", "ignored"];
    if (!ALLOWED_FIELDS.includes(status)) {
      throw new Error("Invalid status");
    }
    const user = await User.findById(toUserId);
    if (!user) {
      throw new Error("User not found");
    }

    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingRequest) {
      throw new Error("Connection request already exists");
    }

    const data = await connectionRequest.save();
    res.json({
      message:
        "connection request sent by " + req.user?.firstName + " successfully",
      data,
    });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

module.exports = router;
