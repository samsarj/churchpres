const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

require('dotenv').config();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Create HTTP server and bind Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // For dev; restrict in prod
    methods: ['GET', 'POST']
  }
});

// Pass io to sockets setup
require('./sockets/liveDisplay')(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
