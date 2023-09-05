const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel.js");
const Message = require("../Models/messageModel.js");
const Chat = require("../Models/chatModels.js");
const cron = require("node-cron");

const response = {};

const scheduler = asyncHandler(async (req, res) => {
  const { content, chatId, timeCode } = req.body;

  if (!content || !chatId || !timeCode) {
    console.log("Invalid data passed to request");
    return res.sendStatus(400);
  }

  const [hour, minute] = timeCode.split(":");
  const cronPattern = `${minute} ${hour} * * *`;

  // Schedule the task
  cron.schedule(cronPattern, async () => {
    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };

    try {
      var message = await Message.create(newMessage);

      message = await message.populate("sender", "name pic");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: "name pic phone",
      });

      await Chat.findByIdAndUpdate(chatId, {
        latestMessage: message,
      });
      response = message;
      res.json(message);
      console.log("Message sent at scheduled time:", message);
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  });
  res.json(response);
});

module.exports = { scheduler };
