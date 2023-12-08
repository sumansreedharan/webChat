// server/routes/messageRoutes.js

const express = require("express");
const router = express.Router();
const messageController = require("../controller/messageController");

// Endpoint to send a message
router.post("/sendMessage", messageController.sendMessage);

// Endpoint to get all messages
router.get("/getMessages", messageController.getMessages);

module.exports = router;
