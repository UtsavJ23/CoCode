const express = require('express');
const Room = require('../models/Room');
const router = express.Router();

// Route to get the code for a specific room
router.get('/:roomId', async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findOne({ roomId });
    if (room) {
      res.json(room);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update the code for a specific room
router.post('/:roomId', async (req, res) => {
  const { roomId } = req.params;
  const { code } = req.body;
  try {
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

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
