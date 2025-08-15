const Housekeeping = require("../models/house_keeping");
const User = require("../models/users");
const { ObjectId } = require("mongoose").Types;

class HousekeepingController {
  // Create housekeeping record
    static async create_house(req, res) {
        try {
            const { room, assignedTo, status, notes, lastCleaned} = req.body;
            const userdb = await User.findById(new ObjectId(assignedTo));
            if (!userdb) return res.status(404).json({ message: "Staff not found" });
            if (userdb.role !== "staff") return res.status(403).json({ message: "Only staff can be assigned housekeeping" });
            if (!room || !assignedTo) return res.status(400).json({message: "Missing information to create"})
            
            const housekeeping = await Housekeeping.create({ room: new ObjectId(room), assignedTo: new ObjectId(assignedTo), status, notes, lastCleaned });
            if(!housekeeping) return res.status(400).json({ message: "Failed to create housekeeping record" });
            res.status(201).json({ message: "Housekeeping record created", housekeeping });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Get all housekeeping records
    static async getAll(req, res) {
        try {
            if (req.user.role !== "admin") return res.status(403).json({ message: "Not authorized to view all records" }); 
            const records = await Housekeeping.find()
                .populate("room")
                .populate({ path: "assignedTo", select: "name email role" });
            return res.status(200).json(records);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    // Get housekeeping record by ID
    static async getById(req, res) {
        try {
            const user = req.user;
            if (user.role === "admin") {
                const record = await Housekeeping.findById(new ObjectId(req.params.id))
                .populate("room")
                .populate({ path: "assignedTo", select: "name email role" });
                if (!record) return res.status(404).json({ message: "Record not found" });
                return res.status(200).json(record);
            }
            const record = await Housekeeping.findOne({
                _id: new ObjectId(req.params.id),
                assignedTo: new ObjectId(user._id)
            });
            if (!record) return res.status(404).json({ message: "Record not found" });
            return res.status(200).json(record);
        } catch (err) {
                return res.status(400).json({ error: err.message });
        }
    }

    // Update housekeeping record
    static async update(req, res) {
        try {
            const user = req.user;
            if (user.role === "admin") {
                const updated = await Housekeeping.findByIdAndUpdate(
                new ObjectId(req.params.id),
                req.body,
                { new: true, runValidators: true }
                );
                if (!updated) return res.status(404).json({ message: "Record not found" });
                return res.status(200).json({ message: "Record updated", updated });
            }
            const updated = await Housekeeping.findOneAndUpdate(
                {_id: new ObjectId(req.params.id), assignedTo: new ObjectId(req.userId)},
                req.body,
                { new: true, runValidators: true });
            if (!updated) return res.status(404).json({ message: "Record not found or not assigned to you" });
            return res.status(200).json({ message: "Record updated", updated });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    // Delete housekeeping record
    static async delete(req, res) {
        try {
            const user = req.user;
            if (user.role === "admin") {
                const deleted = await Housekeeping.findByIdAndDelete(new ObjectId(req.params.id));
                if (!deleted) return res.status(404).json({ message: "Record not found" });
                return res.status(200).json({ message: "Record deleted" });
            }
            return res.status(403).json({message: "Not authorized to delete this record"});
            /* If the staff is allowed to delete their own records uncomment this code*/
            /*const deleted = await Housekeeping.findOneAndDelete({
                _id: new ObjectId(req.params.id),
                assignedTo: new ObjectId(req.userId)
            });
            if (!deleted) return res.status(404).json({ message: "Record not found" });
            res.status(200).json({ message: "Record deleted" }); */
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

module.exports = HousekeepingController;
