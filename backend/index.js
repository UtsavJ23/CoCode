const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const Room = require('./models/Room');
const roomRoutes = require('./routes/room');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:5173", "https://cocoded.netlify.app"],// Replace with your frontend URL
    methods: ["GET", "POST"],
  },
});

// CORS configuration
app.use(cors({
  origin: ["http://localhost:5173", "https://cocoded.netlify.app"], // Replace with your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/room', roomRoutes);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', async ({ roomId }) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);

    // Fetch the code from the database
    try {
      const room = await Room.findOne({ roomId });
      if (room) {
        socket.emit('codeChange', room.code || ''); // Send the existing code to the client
      } else {
        // Create a new room if it doesn't exist
        await new Room({ roomId }).save();
        socket.emit('codeChange', ''); // Emit empty code for new rooms
      }
    } catch (err) {
      console.error('Error loading or creating room:', err);
    }
  });

  socket.on('codeChange', async ({ roomId, code }) => {
    try {
      // Find the room by roomId
      let room = await Room.findOne({ roomId });

      if (!room) {
        // If the room doesn't exist, create a new one
        room = new Room({ roomId, code });
      } else {
        // If the room exists, update the code
        room.code = code;
      }

      // Save the room (insert or update)
      await room.save();

      // Emit the code change to other clients in the room
      socket.to(roomId).emit('codeChange', code);

    } catch (error) {
      console.error('Error handling codeChange:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
