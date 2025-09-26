// src/services/socketService.js
import { io } from "socket.io-client";

let socket;

const socketService = {
  connect: (token) => {
    if (!socket) {
      socket = io(process.env.REACT_APP_API_URL || "http://localhost:5000", {
        auth: { token },
      });
    }
  },
  joinUser: (userId) => {
    if (socket) socket.emit("join", userId);
  },
  onNewMessage: (callback) => {
    if (socket) socket.on("newMessage", callback);
  },
  offNewMessage: () => {
    if (socket) socket.off("newMessage");
  },
  onConversationUpdated: (callback) => {
    if (socket) socket.on("conversationUpdated", callback);
  },
  offConversationUpdated: () => {
    if (socket) socket.off("conversationUpdated");
  },
  disconnect: () => {
    if (socket) socket.disconnect();
    socket = null;
  },
};

export default socketService;
