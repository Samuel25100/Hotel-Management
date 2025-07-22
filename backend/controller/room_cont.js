const Room = require("../models/rooms");

class RoomController {
    static async create(req, res) {
        try {
            const room = new Room(req.body);
            await room.save();
            res.status(201).json({ message: "Room created successfully", room });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

  // Get all rooms
    static async getAll(req, res) {
        try {
            const rooms = await Room.find();
            res.status(200).json(rooms);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

  // Get room by ID
    static async getById(req, res) {
        try {
            const room = await Room.findById(req.params.id);
            if (!room) return res.status(404).json({ message: "Room not found" });
            res.status(200).json(room);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

  // Update room
    static async update(req, res) {
        try {
            const updatedRoom = await Room.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!updatedRoom) {
                return res.status(404).json({ message: "Room not found" });
                res.status(200).json({ message: "Room updated", updatedRoom });
            } 
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

  // Delete room
    static async delete(req, res) {
        try {
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        if (!deletedRoom)
            return res.status(404).json({ message: "Room not found" });
        res.status(200).json({ message: "Room deleted" });
        } catch (err) {
        res.status(400).json({ error: err.message });
        }
    }
}

module.exports = RoomController;