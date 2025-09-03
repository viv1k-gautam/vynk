import { io } from "socket.io-client";

const socket = io("https://vynk-backend.onrender.com", {
  transports: ["websocket", "polling"],
});

// Join a room
export const joinRoom = (roomCode) => {
  if (roomCode) {
    socket.emit("join_room", roomCode);
  }
};

// Listen for incoming messages
export const listenForMessages = (callback) => {
  socket.on("receive_message", callback);
};

// Stop listening to avoid memory leaks
export const stopListeningMessages = () => {
  socket.off("receive_message");
};

// Send a message to room
export const sendMessageToRoom = (roomCode, author, message) => {
  const data = {
    room: roomCode,
    author,
    message,
    time: new Date().toLocaleTimeString(),
  };
  socket.emit("send_message", data);
};

export default socket;
