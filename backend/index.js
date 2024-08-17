const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const Room = require('./models/Room');
const roomRoutes = require('./routes/room');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

mongoose.connect('mongodb://localhost:27017/codeShareDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use('/api/room', roomRoutes);

io.on('connection', (socket) => {
  socket.on('joinRoom', async ({ roomId }) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);

    // Fetch the code from the database
    const room = await Room.findOne({ roomId });
    if (room) {
      socket.emit('codeChange', room.code); // Send the existing code to the client
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
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
