const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const chatSchema = new Schema({
  participants: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: "User",
  },
  messages: {
    type: [messageSchema],
    required: true,
  },
});

const Chat = model("Chat", chatSchema);
module.exports = Chat;
