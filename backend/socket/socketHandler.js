const roomVideos = {};

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('🧩 User connected:', socket.id);

    socket.on('join_room', (room) => {
      socket.join(room);
      console.log(`🟢 ${socket.id} joined room ${room}`);
      if (roomVideos[room]) {
        socket.emit('load-video', roomVideos[room]);
      }
    });

    socket.on('video-url', ({ room, videoId }) => {
      roomVideos[room] = videoId;
      socket.to(room).emit('sync-video', { videoId });
    });

    socket.on('play-video', ({ room, currentTime }) => {
      console.log(`▶️ Play in room ${room} at ${currentTime}`);
      socket.to(room).emit('play-video', { currentTime });
    });

    socket.on('pause-video', ({ room, currentTime }) => {
      console.log(`⏸️ Pause in room ${room} at ${currentTime}`);
      socket.to(room).emit('pause-video', { currentTime });
    });

    socket.on('seek-video', ({ room, time }) => {
      console.log(`⏩ Seek in room ${room} to ${time}`);
      socket.to(room).emit('seek-video', time);
    });

    socket.on('request-sync', (roomCode) => {
  console.log("📨 Viewer requested sync from host");
  // Emit to all others (ideally just host)
  socket.to(roomCode).emit('send-current-time');
});

socket.on('sync-to', ({ room, currentTime }) => {
  console.log(`🔁 Host sending current time ${currentTime} to viewers in ${room}`);
  socket.to(room).emit('sync-to', { currentTime });
});


    socket.on('send_message', (data) => {
      io.to(data.room).emit('receive_message', data);
    });

    socket.on('delete-room', (room) => {
      io.to(room).emit('room-deleted');
      console.log(`Room ${room} deleted`);
    });

    socket.on('disconnect', () => {
      console.log('❌ User disconnected', socket.id);
    });
  });
};

module.exports = socketHandler;
