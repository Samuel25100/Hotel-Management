const Room = require("../models/rooms");

class RoomController {
    static async create(req, res) {
        try {
            if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
            const { number, type, price, description, capacity, amenities, images } = req.body;
            const room = await Room.create({ number, type, price, description, capacity, amenities, images });
            if (!room) return res.status(400).json({ message: "Room creation failed" });
            return res.status(201).json({ message: "Room created successfully", room });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

  // Get all rooms
    static async getAll(req, res) {
        try {
            const rooms = await Room.find().select('-__v -description -isAvailable'); // Exclude __v field
            return res.status(200).json(rooms);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

  // Get room by ID
    static async getById(req, res) {
        try {
            const room = await Room.findById(req.params.id).select('-__v'); // Exclude __v field
            if (!room) return res.status(404).json({ message: "Room not found" });
            return res.status(200).json(room);
        } catch (err) {
            return res.status(400).json({ error: err.message });
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
            if (!updatedRoom) return res.status(404).json({ message: "Room not found" });
            return res.status(200).json({ message: "Room updated successfully", room: updatedRoom }); 
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

  // Delete room
    static async delete(req, res) {
        try {
        if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        if (!deletedRoom) return res.status(404).json({ message: "Room not found" });
        return res.status(200).json({ message: "Room deleted" });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

module.exports = RoomController;