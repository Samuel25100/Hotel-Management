const Housekeeping = require("../models/house_keeping");

class HousekeepingController {
  // Create housekeeping record
    static async create(req, res) {
        try {
            const housekeeping = new Housekeeping(req.body);
            await housekeeping.save();
            res.status(201).json({ message: "Housekeeping record created", housekeeping });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Get all housekeeping records
    static async getAll(req, res) {
        try {
            const records = await Housekeeping.find()
                .populate("room")
                .populate("assignedTo");
            res.status(200).json(records);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Get housekeeping record by ID
    static async getById(req, res) {
        try {
            const record = await Housekeeping.findById(req.params.id)
                .populate("room")
                .populate("assignedTo");
            if (!record) return res.status(404).json({ message: "Record not found" });
            res.status(200).json(record);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Update housekeeping record
    static async update(req, res) {
        try {
            const updated = await Housekeeping.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
        if (!updated) return res.status(404).json({ message: "Record not found" });
            res.status(200).json({ message: "Record updated", updated });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Delete housekeeping record
    static async delete(req, res) {
        try {
            const deleted = await Housekeeping.findByIdAndDelete(req.params.id);
            if (!deleted) return res.status(404).json({ message: "Record not found" });
            res.status(200).json({ message: "Record deleted" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = HousekeepingController;
