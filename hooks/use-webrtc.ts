"use client";

import { useState, useRef, useEffect } from "react";
import { Tool } from "@/lib/tools";

const useWebRTCAudioSession = (voice: string, tools?: Tool[]) => {
  const [status, setStatus] = useState("");
  const [isSessionActive, setIsSessionActive] = useState(false);
  const audioIndicatorRef = useRef<HTMLDivElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const [msgs, setMsgs] = useState<any[]>([]);
  // Add function registry
  const functionRegistry = useRef<Record<string, Function>>({});

  // Add method to register tool functions
  const registerFunction = (name: string, fn: Function) => {
    functionRegistry.current[name] = fn;
  };

  // Add data channel configuration
  const configureDataChannel = (dataChannel: RTCDataChannel) => {
    const sessionUpdate = {
      type: 'session.update',
      session: {
        modalities: ['text', 'audio'],
        tools: tools || []
      }
    };

    dataChannel.send(JSON.stringify(sessionUpdate));
  };

  // Add data channel message handler
  const handleDataChannelMessage = async (event: MessageEvent) => {
    try {
      const msg = JSON.parse(event.data);
      if (msg.type === 'response.function_call_arguments.done') {
        const fn = functionRegistry.current[msg.name];
        if (fn) {
          const args = JSON.parse(msg.arguments);
          const result = await fn(args);

          const response = {
            type: 'conversation.item.create',
            item: {
              type: 'function_call_output',
              call_id: msg.call_id,
              output: JSON.stringify(result)
            }
          };

          dataChannelRef.current?.send(JSON.stringify(response));
        }
      }
      setMsgs(prevMsgs => [...prevMsgs, msg]);
      return msg;
    } catch (error) {
      console.error('Error handling data channel message:', error);
    }
  };

  useEffect(() => {
    return () => stopSession();
  }, []);

  const getEphemeralToken = async () => {
    const response = await fetch('/api/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.client_secret.value;
  };

  const setupAudioVisualization = (stream: MediaStream) => {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 256;

    source.connect(analyzer);

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateIndicator = () => {
      if (!audioContext) return;

      analyzer.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;

      if (audioIndicatorRef.current) {
        audioIndicatorRef.current.classList.toggle("active", average > 30);
      }

      requestAnimationFrame(updateIndicator);
    };

    updateIndicator();
    audioContextRef.current = audioContext;
  };

  const startSession = async () => {
    try {
      setStatus("Requesting microphone access...");

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      setupAudioVisualization(stream);

      setStatus("Fetching ephemeral token...");
      const ephemeralToken = await getEphemeralToken();

      setStatus("Establishing connection...");

      const pc = new RTCPeerConnection();
      const audioEl = document.createElement("audio");
      audioEl.autoplay = true;
      pc.ontrack = (e) => (audioEl.srcObject = e.streams[0]);

      // Add data channel
      const dataChannel = pc.createDataChannel('response');
      dataChannelRef.current = dataChannel;

      dataChannel.onopen = () => {
        configureDataChannel(dataChannel);
      };

      dataChannel.onmessage = handleDataChannelMessage;

      pc.addTrack(stream.getTracks()[0]);

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const baseUrl = "https://api.openai.com/v1/realtime";
      const model = "gpt-4o-realtime-preview-2024-12-17";
      const response = await fetch(`${baseUrl}?model=${model}&voice=${voice}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${ephemeralToken}`,
          "Content-Type": "application/sdp",
        },
      });

      await pc.setRemoteDescription({
        type: "answer",
        sdp: await response.text(),
      });

      peerConnectionRef.current = pc;
      setIsSessionActive(true);
      setStatus("Session established successfully!");
    } catch (err) {
      console.error(err);
      setStatus(`Error: ${err}`);
      stopSession();
    }
  };

  const stopSession = () => {
    if (dataChannelRef.current) {
      dataChannelRef.current.close();
      dataChannelRef.current = null;
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      audioStreamRef.current = null;
    }

    if (audioIndicatorRef.current) {
      audioIndicatorRef.current.classList.remove("active");
    }

    setIsSessionActive(false);
    setStatus("");
    setMsgs([]);
  };

  const handleStartStopClick = () => {
    if (isSessionActive) {
      stopSession();
    } else {
      startSession();
    }
  };

  return {
    status,
    isSessionActive,
    audioIndicatorRef,
    startSession,
    stopSession,
    handleStartStopClick,
    registerFunction,
    msgs
  };
};

export default useWebRTCAudioSession;