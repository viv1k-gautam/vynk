const socketHandler=(io)=>{
    io.on('connection',(socket)=>{
        console.log('user connected',socket.id);

        socket.on('join_room',(roomCodeget)=>{
            socket.join(roomCodeget);
            console.log(`🟢 ${socket.id}join room ${roomCodeget}`);

        })

      // Agar host room delete kare
  socket.on('delete-room', (roomCodeget) => {
    io.to(roomCodeget).emit('room-deleted');
    console.log(`Room ${roomCodeget} deleted`);
  });

        socket.on('send_message',(data)=>{
            io.to(data.room).emit('receive_message',data)
        })

        socket.on('disconnect',()=>{
            console.log('user disconnect',socket.id);
        } )
    })
}

module.exports =socketHandler;