import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/messages";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const messageAPI = {
  // Conversation management
  getOrCreateConversation: (buyerId, sellerId) =>
    api.post("/conversation", { buyerId, sellerId }),

  getUserConversations: () =>
    api.get("/conversations"),

  getMessages: (conversationId) =>
    api.get(`/${conversationId}`),

  sendMessage: (messageData) =>
    api.post("/send", messageData),

  markAsRead: (conversationId) =>
    api.put("/read", { conversationId }),
};

export default messageAPI;
