import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Request interceptor for auth
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const callAPI = {
  // Create call offer
  createCallOffer: (callData) =>
    api.post("/calls/offer", callData),

  // Answer call
  answerCall: (answerData) =>
    api.post("/calls/answer", answerData),

  // Send ICE candidate
  sendICECandidate: (candidateData) =>
    api.post("/calls/ice-candidate", candidateData),

  // End call
  endCall: (callId) =>
    api.post("/calls/end", { callId }),

  // Reject call
  rejectCall: (callId) =>
    api.post("/calls/reject", { callId }),

  // Get call history
  getCallHistory: (conversationId) =>
    api.get(`/calls/history/${conversationId}`),
};

export default callAPI;