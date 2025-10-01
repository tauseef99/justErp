import React, { useEffect, useRef, useState } from 'react';
import { FaPhone, FaVideo, FaMicrophone, FaMicrophoneSlash, FaVideoSlash, FaTimes, FaUser } from 'react-icons/fa';
import useWebRTC from '../hooks/useWebRTC';

const CallModal = ({ 
  call, 
  onClose, 
  onAnswer, 
  onReject, 
  isIncoming = false,
  isActive = false 
}) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  const {
    answerCall,
    endCall,
    toggleVideo,
    toggleAudio,
    isCallActive,
    localStream,
    remoteStream
  } = useWebRTC(localVideoRef, remoteVideoRef);

  // Timer for call duration
  useEffect(() => {
    let interval;
    if (isActive && isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isCallActive]);

  // Format call duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = async (type = 'audio') => {
    try {
      await answerCall(call, type);
      if (onAnswer) onAnswer();
    } catch (error) {
      console.error('Error answering call:', error);
      alert('Failed to answer call. Please try again.');
    }
  };

  const handleEndCall = async () => {
    await endCall();
    if (onClose) onClose();
  };

  const handleReject = async () => {
    try {
      await onReject(call._id);
      if (onClose) onClose();
    } catch (error) {
      console.error('Error rejecting call:', error);
    }
  };

  const handleToggleVideo = async () => {
    const enabled = await toggleVideo();
    setIsVideoEnabled(enabled);
  };

  const handleToggleAudio = async () => {
    const enabled = await toggleAudio();
    setIsAudioEnabled(enabled);
  };

  const callerName = call?.caller?.name || 'Unknown Caller';
  const callType = call?.callType || 'audio';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden">
        {/* Call Header */}
        <div className="bg-gradient-to-r from-[#708238] to-[#FFA500] p-6 text-white text-center">
          <h2 className="text-2xl font-bold">
            {isIncoming ? 'Incoming Call' : isActive ? 'Ongoing Call' : 'Outgoing Call'}
          </h2>
          <p className="text-white/80 mt-1">
            {isIncoming ? callerName : `Calling ${call?.receiver?.name || 'Unknown'}`}
          </p>
          {isActive && (
            <p className="text-xl font-mono mt-2">{formatDuration(callDuration)}</p>
          )}
        </div>

        {/* Video Area */}
        <div className="relative bg-gray-900 aspect-video">
          {/* Remote Video */}
          {isActive && callType === 'video' ? (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              muted={false}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUser className="text-3xl text-gray-400" />
                </div>
                <p className="text-white text-lg font-semibold">
                  {isIncoming ? callerName : call?.receiver?.name}
                </p>
                <p className="text-gray-400">
                  {isActive ? 'Call in progress' : isIncoming ? 'Incoming call...' : 'Calling...'}
                </p>
              </div>
            </div>
          )}

          {/* Local Video Preview */}
          {isActive && callType === 'video' && (
            <div className="absolute bottom-4 right-4 w-32 h-24 bg-black rounded-lg overflow-hidden border-2 border-white">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Call Controls */}
        <div className="bg-white p-6">
          <div className="flex justify-center space-x-4">
            {isIncoming && !isActive ? (
              <>
                {/* Incoming Call Controls */}
                <button
                  onClick={() => handleAnswer('audio')}
                  className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full transition transform hover:scale-105"
                >
                  <FaPhone className="text-xl" />
                </button>
                <button
                  onClick={() => handleAnswer('video')}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full transition transform hover:scale-105"
                >
                  <FaVideo className="text-xl" />
                </button>
                <button
                  onClick={handleReject}
                  className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full transition transform hover:scale-105"
                >
                  <FaTimes className="text-xl" />
                </button>
              </>
            ) : isActive ? (
              <>
                {/* Active Call Controls */}
                <button
                  onClick={handleToggleAudio}
                  className={`p-4 rounded-full transition transform hover:scale-105 ${
                    isAudioEnabled 
                      ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' 
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  {isAudioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
                </button>
                <button
                  onClick={handleEndCall}
                  className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full transition transform hover:scale-105"
                >
                  <FaPhone className="text-xl rotate-135" />
                </button>
                <button
                  onClick={handleToggleVideo}
                  className={`p-4 rounded-full transition transform hover:scale-105 ${
                    isVideoEnabled && callType === 'video'
                      ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  {isVideoEnabled && callType === 'video' ? <FaVideo /> : <FaVideoSlash />}
                </button>
              </>
            ) : (
              <>
                {/* Outgoing Call Controls */}
                <button
                  onClick={handleEndCall}
                  className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full transition transform hover:scale-105"
                >
                  <FaPhone className="text-xl rotate-135" />
                </button>
              </>
            )}
          </div>

          {/* Control Labels */}
          <div className="flex justify-center space-x-12 mt-4 text-sm text-gray-600">
            {isIncoming && !isActive ? (
              <>
                <span>Audio Answer</span>
                <span>Video Answer</span>
                <span>Decline</span>
              </>
            ) : isActive ? (
              <>
                <span>{isAudioEnabled ? 'Mute' : 'Unmute'}</span>
                <span>End Call</span>
                <span>{isVideoEnabled ? 'Video Off' : 'Video On'}</span>
              </>
            ) : (
              <span>Cancel Call</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallModal;