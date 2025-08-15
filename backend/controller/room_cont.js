const Room = require("../models/rooms");
const mongoose = require('mongoose');
const { ObjectId } = require("mongoose").Types;

class RoomController {

    static async create(req, res) {
        try {
            if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
            const { number, type, price, description, capacity, amenities, images } = req.body;
            const existingRoom = await Room.findOne({ number });
            if (existingRoom) return res.status(409).json({ message: "Room already exists" });
            const room = await Room.create({ number, type, price, description, capacity, amenities, images });
            if (!room) return res.status(400).json({ message: "Room creation failed" });
            else {
                const roomOut = await Room.findOne({ number: room.number }).select('-__v -_id');
                return res.status(201).json({ message: "Room created successfully", room: roomOut });
            }
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

  // Get all rooms
    static async getAll(req, res) {
        try {
            const rooms = await Room.find().select('-__v -description'); // Exclude __v and _id fields
            return res.status(200).json({"number of room": rooms.length, rooms});
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

  // Get room by room number
    static async getByNumber(req, res) {
        try {
            const room = await Room.findOne({ number: req.params.number }).select('-__v'); // Exclude __v field
            if (!room) return res.status(404).json({ message: "Room not found" });
            return res.status(200).json(room);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

  // Update room
    static async update(req, res) {
        try {
            const updatedRoom = await Room.findOneAndUpdate(
                { number: req.params.number },
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
            const deletedRoom = await Room.findOneAndDelete({ number: req.params.number });
            if (!deletedRoom) return res.status(404).json({ message: "Room not found" });
            return res.status(200).json({ message: "Room deleted" });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

module.exports = RoomController;