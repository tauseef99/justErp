import { useState, useRef, useCallback, useEffect } from 'react';
import socketService from '../services/socketService';
import callAPI from '../services/callService';

const useWebRTC = (localVideoRef, remoteVideoRef) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isCallInProgress, setIsCallInProgress] = useState(false);
  const [callType, setCallType] = useState('audio'); // 'audio' or 'video'
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [currentCall, setCurrentCall] = useState(null);

  const peerConnection = useRef(null);
  const currentCallRef = useRef(null);

  // STUN servers configuration
  const iceServers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
    ],
  };

  // Get the other user's ID
  const getOtherUserId = useCallback(() => {
    if (!currentCallRef.current) return null;
    const user = JSON.parse(localStorage.getItem('user'));
    return currentCallRef.current.caller._id === user.id 
      ? currentCallRef.current.receiver._id 
      : currentCallRef.current.caller._id;
  }, []);

  // Initialize local media stream
  const initializeLocalStream = useCallback(async (type = 'audio') => {
    try {
      const constraints = {
        audio: true,
        video: type === 'video' ? {
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } : false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setLocalStream(stream);
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      return stream;
    } catch (error) {
      console.error('❌ Error accessing media devices:', error);
      throw new Error(`Failed to access ${type} devices: ${error.message}`);
    }
  }, [localVideoRef]);

  // End call function - FIXED: Properly defined
  const endCall = useCallback(async () => {
    try {
      console.log('📞 Ending call...');
      
      if (currentCallRef.current) {
        await callAPI.endCall(currentCallRef.current._id);
      }

      // Clean up
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }

      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        setLocalStream(null);
      }

      setRemoteStream(null);
      setIsCallActive(false);
      setIsCallInProgress(false);
      setCurrentCall(null);
      currentCallRef.current = null;

      console.log('✅ Call ended');
    } catch (error) {
      console.error('❌ Error ending call:', error);
    }
  }, [localStream]);

  // Initialize peer connection
  const createPeerConnection = useCallback(() => {
    try {
      const pc = new RTCPeerConnection(iceServers);
      
      // Add local stream to connection
      if (localStream) {
        localStream.getTracks().forEach(track => {
          pc.addTrack(track, localStream);
        });
      }

      // Handle remote stream
      pc.ontrack = (event) => {
        console.log('📹 Remote track received:', event.streams[0]);
        const remoteStream = event.streams[0];
        setRemoteStream(remoteStream);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      };

      // Handle ICE candidates
      pc.onicecandidate = (event) => {
        if (event.candidate && currentCallRef.current) {
          console.log('❄️ ICE candidate generated');
          const targetUserId = getOtherUserId();
          socketService.emitICECandidate({
            callId: currentCallRef.current._id,
            candidate: event.candidate,
            targetUserId
          });
          
          // Also send via HTTP for reliability
          callAPI.sendICECandidate({
            callId: currentCallRef.current._id,
            candidate: event.candidate,
            targetUserId
          }).catch(console.error);
        }
      };

      // Handle connection state changes
      pc.onconnectionstatechange = () => {
        console.log('🔗 Connection state:', pc.connectionState);
        if (pc.connectionState === 'connected') {
          setIsCallActive(true);
          console.log('✅ WebRTC connection established');
        } else if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
          console.log('❌ WebRTC connection failed');
          endCall(); // FIXED: Use endCall instead of handleEndCall
        }
      };

      peerConnection.current = pc;
      return pc;
    } catch (error) {
      console.error('❌ Error creating peer connection:', error);
      throw error;
    }
  }, [localStream, endCall, getOtherUserId]); // FIXED: Added dependencies

  // Start a call
  const startCall = useCallback(async (conversationId, type = 'audio') => {
    try {
      console.log('📞 Starting call...', { conversationId, type });
      
      setIsCallInProgress(true);
      setCallType(type);

      // Initialize local stream
      await initializeLocalStream(type);
      
      // Create peer connection
      const pc = createPeerConnection();
      
      // Create offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Send offer to server
      const response = await callAPI.createCallOffer({
        conversationId,
        callType: type,
        offer
      });

      const call = response.data.call;
      setCurrentCall(call);
      currentCallRef.current = call;

      console.log('✅ Call offer sent:', call._id);
      return call;
    } catch (error) {
      console.error('❌ Error starting call:', error);
      setIsCallInProgress(false);
      // Clean up on error
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        setLocalStream(null);
      }
      throw error;
    }
  }, [initializeLocalStream, createPeerConnection, localStream]);

  // Answer incoming call
  const answerCall = useCallback(async (call, type = 'audio') => {
    try {
      console.log('📞 Answering call...', call._id);
      
      setIsCallInProgress(true);
      setCallType(type);
      setCurrentCall(call);
      currentCallRef.current = call;

      // Initialize local stream
      await initializeLocalStream(type);
      
      // Create peer connection
      const pc = createPeerConnection();
      
      // Set remote description from offer
      await pc.setRemoteDescription(call.offer);

      // Create answer
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      // Send answer to server
      await callAPI.answerCall({
        callId: call._id,
        answer
      });

      console.log('✅ Call answered');
    } catch (error) {
      console.error('❌ Error answering call:', error);
      setIsCallInProgress(false);
      // Clean up on error
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        setLocalStream(null);
      }
      throw error;
    }
  }, [initializeLocalStream, createPeerConnection, localStream]);

  // Handle incoming call offer
  const handleIncomingCall = useCallback(async (data) => {
    try {
      console.log('📞 Incoming call received:', data);
      
      // Store call data for later use
      setCurrentCall(data.call);
      currentCallRef.current = data.call;
      setCallType(data.call.callType);

      // You can show a notification or call UI here
      return data.call;
    } catch (error) {
      console.error('❌ Error handling incoming call:', error);
    }
  }, []);

  // Handle remote answer
  const handleRemoteAnswer = useCallback(async (data) => {
    try {
      console.log('📞 Remote answer received:', data);
      
      if (peerConnection.current && data.answer) {
        await peerConnection.current.setRemoteDescription(data.answer);
        console.log('✅ Remote description set');
      }
    } catch (error) {
      console.error('❌ Error handling remote answer:', error);
    }
  }, []);

  // Handle ICE candidate from remote
  const handleRemoteICECandidate = useCallback(async (data) => {
    try {
      if (peerConnection.current && data.candidate) {
        await peerConnection.current.addIceCandidate(data.candidate);
        console.log('✅ Remote ICE candidate added');
      }
    } catch (error) {
      console.error('❌ Error adding remote ICE candidate:', error);
    }
  }, []);

  // Reject call
  const rejectCall = useCallback(async (callId) => {
    try {
      await callAPI.rejectCall(callId);
      setCurrentCall(null);
      currentCallRef.current = null;
      setIsCallInProgress(false);
      console.log('✅ Call rejected');
    } catch (error) {
      console.error('❌ Error rejecting call:', error);
      throw error;
    }
  }, []);

  // Toggle video
  const toggleVideo = useCallback(async () => {
    if (!localStream) return;

    const videoTrack = localStream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      return videoTrack.enabled;
    }
    return false;
  }, [localStream]);

  // Toggle audio
  const toggleAudio = useCallback(async () => {
    if (!localStream) return;

    const audioTrack = localStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      return audioTrack.enabled;
    }
    return false;
  }, [localStream]);

  // Setup socket listeners
  useEffect(() => {
    socketService.onIncomingCall(handleIncomingCall);
    socketService.onCallAnswered(handleRemoteAnswer);
    socketService.onICECandidate(handleRemoteICECandidate);
    socketService.onCallEnded(() => {
      console.log('📞 Call ended by remote party');
      endCall(); // FIXED: Use endCall instead of handleEndCall
    });

    return () => {
      socketService.offIncomingCall();
      socketService.offCallAnswered();
      socketService.offICECandidate();
      socketService.offCallEnded();
    };
  }, [handleIncomingCall, handleRemoteAnswer, handleRemoteICECandidate, endCall]); // FIXED: Added endCall dependency

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isCallActive || isCallInProgress) {
        endCall(); // FIXED: Use endCall instead of handleEndCall
      }
    };
  }, [isCallActive, isCallInProgress, endCall]); // FIXED: Added endCall dependency

  return {
    // State
    isCallActive,
    isCallInProgress,
    callType,
    localStream,
    remoteStream,
    currentCall,

    // Methods
    startCall,
    answerCall,
    endCall, // FIXED: Return endCall directly
    rejectCall,
    toggleVideo,
    toggleAudio,
    handleIncomingCall,
  };
};

export default useWebRTC;