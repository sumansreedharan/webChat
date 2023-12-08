
// server/index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  pingTimeOut: 60000,
  cors: true,
});

const PORT = 3001;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/chatApp", {
});

// Routes
app.use("/messages", messageRoutes);

// Socket.io setup
io.on("connection", (socket) => {
  console.log("Connected to socket:", socket.id);

  socket.on("message", async (message) => {
    console.log("Received message:", message);
    io.emit("received-message", message);
  });
});

// Server start
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});