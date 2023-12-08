// server/controllers/messageController.js

const Message = require("../models/messageModel");

const sendMessage = async (req, res) => {
  try {
    const { senderUserId, message } = req.body;
    const newMessage = new Message({ senderUserId, message });
    await newMessage.save();
    res.status(201).send("Message sent successfully");
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: "asc" });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
    sendMessage,
    getMessages,
}
