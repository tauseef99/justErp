// frontend/src/services/offerService.js
import api from './api';

export const offerAPI = {
  // Create a new custom offer
  createOffer: async (offerData) => {
    const response = await api.post('/api/offers/create', offerData);
    return response;
  },

  // Get offers for a conversation
  getOffersByConversation: async (conversationId) => {
    const response = await api.get(`/api/offers/conversation/${conversationId}`);
    return response;
  },

  // Accept an offer
  acceptOffer: async (offerId) => {
    const response = await api.patch(`/api/offers/${offerId}/accept`);
    return response;
  },

  // Reject an offer
  rejectOffer: async (offerId) => {
    const response = await api.patch(`/api/offers/${offerId}/reject`);
    return response;
  },

  // Get offer details
  getOffer: async (offerId) => {
    const response = await api.get(`/api/offers/${offerId}`);
    return response;
  },

  // Update offer status
  updateOfferStatus: async (offerId, status) => {
    const response = await api.patch(`/api/offers/${offerId}/status`, { status });
    return response;
  }
};

export const paymentAPI = {
  // Create Stripe checkout session
  createCheckoutSession: async (paymentData) => {
    const response = await api.post('/api/payments/create-checkout-session', paymentData);
    return response;
  },

  // Get payment status
  getPaymentStatus: async (sessionId) => {
    const response = await api.get(`/api/payments/status/${sessionId}`);
    return response;
  },

  // Get payment by offer ID
  getPaymentByOfferId: async (offerId) => {
    const response = await api.get(`/api/payments/offer/${offerId}`);
    return response;
  }
};

// For backward compatibility
export default { offerAPI, paymentAPI };