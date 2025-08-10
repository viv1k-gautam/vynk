// hooks/useChat.js
import { useEffect, useState, useRef } from 'react';
import socket from '../utils/socket';

export const useChat = (roomCode) => {
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (roomCode) {
      socket.emit('join_room', roomCode);
    }

    const handleReceiveMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on('receive_message', handleReceiveMessage);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [roomCode]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return { messages, setMessages, chatEndRef };
};
