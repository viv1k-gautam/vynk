
export const formatMessage = (roomCode, author, message) => {
  return {
    room: roomCode,
    author,
    message,
    time: new Date().toLocaleTimeString(),
  };
};
