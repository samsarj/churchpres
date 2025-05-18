let liveState = {
  liveItem: null,
  liveSlideIndex: 0,
  blank: false,
  clear: false,
};

module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('live:get', () => {
      socket.emit('live:state', liveState);
    });

    socket.on('live:set', (data) => {
      const { type } = data;

      if (type === 'item') {
        liveState.liveItem = data.item;
        liveState.liveSlideIndex = 0;
      } else if (type === 'slideIndex') {
        liveState.liveSlideIndex = data.slideIndex;
      } else if (type === 'blank') {
        liveState.blank = data.blank;
      } else if (type === 'clear') {
        liveState.clear = data.clear;
      }

      io.emit('live:update', data); // broadcast to all
    });
  });
}
