import { useState, useEffect, useRef } from "react";
import socket from "../utils/socket";
import { extractYoutubeVideoID } from "../components/youtube/YoutubeUtils";

export const useRoom = ({ url, roomCode }) => {
  const chatEndRef = useRef(null);
  const [videoId, setVideoId] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

    if (url) {
      const id = extractYoutubeVideoID(url);
      setVideoId(id);
    }

    if (roomCode) {
      socket.emit("join_room", roomCode);
    }

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, [url, roomCode]);

  return { videoId, messages, chatEndRef };
};
