const express = require("express");
const router = express.Router();
const { authUser } = require("../middlewares/auth");
const Chat = require("../models/chat");

router.get("/chats/:targetUserId", authUser, async (req, res) => {
  try {
    const { targetUserId } = req.params;
    let chat = await Chat.findOne({
      participants: { $all: [req.user._id, targetUserId] },
    }).populate("messages.sender", "firstName lastName photoUrl");
    if (!chat) {
      chat = await Chat({
        participants: [req.user._id, targetUserId],
        messages: [],
      });
      await chat.save();
    }
    res.json({ message: "Chat fetched successfully", data: chat });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
