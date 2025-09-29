// frontend/src/services/socketService.js 
import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.connectionAttempts = 0;
    this.maxConnectionAttempts = 3;
  }

  connect(token) {
    return new Promise((resolve, reject) => {
      try {
        if (this.socket && this.isConnected) {
          console.log('✅ Socket already connected');
          resolve(this.socket);
          return;
        }

        // Prevent too many connection attempts
        if (this.connectionAttempts >= this.maxConnectionAttempts) {
          console.warn('⚠️ Max connection attempts reached');
          reject(new Error('Max connection attempts reached'));
          return;
        }

        console.log('🔌 Connecting to socket...');
        this.connectionAttempts++;

        this.socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
          auth: { token },
          transports: ['websocket', 'polling'],
          timeout: 10000,
          reconnectionAttempts: 3,
          reconnectionDelay: 1000
        });

        const connectionTimeout = setTimeout(() => {
          reject(new Error('Socket connection timeout'));
        }, 8000);

        this.socket.on('connect', () => {
          clearTimeout(connectionTimeout);
          console.log('✅ Socket connected successfully:', this.socket.id);
          this.isConnected = true;
          this.connectionAttempts = 0;
          resolve(this.socket);
        });

        this.socket.on('disconnect', (reason) => {
          console.log('❌ Socket disconnected:', reason);
          this.isConnected = false;
        });

        this.socket.on('connect_error', (error) => {
          clearTimeout(connectionTimeout);
          console.error('❌ Socket connection error:', error);
          this.isConnected = false;
          reject(error);
        });

      } catch (error) {
        console.error('❌ Error connecting socket:', error);
        reject(error);
      }
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.connectionAttempts = 0;
      console.log('✅ Socket disconnected');
    }
  }

  joinUser(userId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('joinUser', userId);
      console.log(`✅ Joined user room: ${userId}`);
      return true;
    } else {
      console.warn('⚠️ Socket not connected, cannot join user room');
      return false;
    }
  }

  joinConversation(conversationId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('joinConversation', conversationId);
      console.log(`✅ Joined conversation room: ${conversationId}`);
      return true;
    } else {
      console.warn('⚠️ Socket not connected, cannot join conversation');
      return false;
    }
  }

  leaveConversation(conversationId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('leaveConversation', conversationId);
      console.log(`✅ Left conversation room: ${conversationId}`);
    }
  }

  onNewMessage(callback) {
    if (this.socket) {
      this.socket.on('newMessage', callback);
    }
  }

  offNewMessage() {
    if (this.socket) {
      this.socket.off('newMessage');
    }
  }

  onConversationUpdated(callback) {
    if (this.socket) {
      this.socket.on('conversationUpdated', callback);
    }
  }

  offConversationUpdated() {
    if (this.socket) {
      this.socket.off('conversationUpdated');
    }
  }

  onUserTyping(callback) {
    if (this.socket) {
      this.socket.on('userTyping', callback);
    }
  }

  emitTyping(conversationId, isTyping) {
    if (this.socket && this.isConnected) {
      this.socket.emit('typing', { conversationId, isTyping });
    }
  }

  getConnectionStatus() {
    return this.isConnected;
  }

  waitForConnection(timeout = 5000) {
    return new Promise((resolve, reject) => {
      if (this.isConnected) {
        resolve(true);
        return;
      }

      const checkInterval = setInterval(() => {
        if (this.isConnected) {
          clearInterval(checkInterval);
          resolve(true);
        }
      }, 100);

      setTimeout(() => {
        clearInterval(checkInterval);
        reject(new Error('Connection timeout'));
      }, timeout);
    });
  }
}

const socketService = new SocketService();
export default socketService;