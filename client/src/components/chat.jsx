// client/src/components/Chat.jsx

import React, { useEffect, useState } from "react";
import { useSocket } from "../context/socketProvider";
import axios from "axios";
import "./chat.scss"

const Chat = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("/messages/getMessages");
        const formattedMessages = response.data.map((msg) => ({
          ...msg,
          timestamp: getCurrentTime(),
        }));
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    socket.on("received-message", (message) => {
      console.log("Received message:", message);
      
    //   const currentTime = getCurrentTime();
    //   setMessages((prevMessages) => [
    //     ...prevMessages,
    //     { send: false, message: message, timestamp: currentTime },
    //   ]);
    // });
    if (!messages.some((msg) => msg.message === message)) {
      const currentTime = getCurrentTime();
      setMessages((prevMessages) => [
        ...prevMessages,
        { send: false, message: message, timestamp: currentTime },
      ]);
    }
  });

    return () => {
      socket.off("received-message");
    };
  }, [socket,messages]);

  const getCurrentTime = () => {
    const now = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return now.toLocaleDateString(undefined, options);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      try {
        await axios.post("http://localhost:3001/messages/sendMessage", {
          senderUserId: user.id,
          message,
        });
        socket.emit("message", message);
        const currentTime = getCurrentTime();
        setMessages((prevMessages) => [
          ...prevMessages,
          { send: true, message: message, timestamp: currentTime },
        ]);
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      alert("empty message");
    }
  };

  return (
    <div>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message${msg.send ? " out" : " in"}`}
            >
              <strong>{msg.message}</strong>
              <p className="message-time">{msg.timestamp}</p>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="message-form">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

