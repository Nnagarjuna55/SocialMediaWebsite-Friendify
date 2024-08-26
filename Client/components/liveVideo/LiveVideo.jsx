

import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const LiveVideo = ({ onStop }) => {
  const [isRecording, setIsRecording] = useState(false);
  const localVideoRef = useRef(null);
  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const streamRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:5001');

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        localVideoRef.current.srcObject = stream;

        const peerConnection = new RTCPeerConnection();
        stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
        peerConnectionRef.current = peerConnection;

        socketRef.current.on('offer', (offer) => {
          peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
          peerConnection.createAnswer().then(answer => {
            peerConnection.setLocalDescription(answer);
            socketRef.current.emit('answer', answer);
          });
        });

        socketRef.current.on('answer', (answer) => {
          peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        });

        socketRef.current.on('ice-candidate', (candidate) => {
          peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        });

        peerConnection.createOffer().then(offer => {
          peerConnection.setLocalDescription(offer);
          socketRef.current.emit('offer', offer);
        });

        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            socketRef.current.emit('ice-candidate', event.candidate);
          }
        };

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
          onStop(blob);
          recordedChunksRef.current = [];
        };

      }).catch(err => console.error('Failed to get user media', err));

    return () => {
      socketRef.current.disconnect();
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, [onStop]);

  const handleStartRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'inactive') {
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl mb-4">Live Video</h2>
      <video ref={localVideoRef} autoPlay muted className="w-80 h-52 mb-4 border border-gray-300" />
      <div className="flex flex-col items-center">
        {isRecording ? (
          <button onClick={handleStopRecording} className="bg-red-500 text-white py-2 px-4 rounded">Stop Recording</button>
        ) : (
          <button onClick={handleStartRecording} className="bg-green-500 text-white py-2 px-4 rounded">Start Recording</button>
        )}
      </div>
    </div>
  );
};

export default LiveVideo;
