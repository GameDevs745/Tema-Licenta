const io = require('socket.io')();

const chatController = {
  init: (server) => {
    io.listen(server);
    io.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('join', (data) => {
        const { userId, matchId } = data;
        socket.join(matchId);
        console.log(`User ${userId} joined match ${matchId}`);
      });

      socket.on('message', (data) => {
        const { message, matchId } = data;
        io.to(matchId).emit('message', message);
        console.log(`Message sent to match ${matchId}`);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }
};

module.exports = chatController;