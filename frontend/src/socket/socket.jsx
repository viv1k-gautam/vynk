import { io } from "socket.io-client";
const socket = io("https://vynk-backend.onrender.com"); // apna backend ka port
export default socket;
