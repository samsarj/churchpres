module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('go-live', (data) => {
      // broadcast to all clients except sender
      socket.broadcast.emit('update-live-display', data);
    });

    socket.on('preview-slide', (data) => {
      socket.broadcast.emit('update-preview', data);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
