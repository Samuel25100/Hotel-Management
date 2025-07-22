const Booking = require("../models/booking");

class BookingController {
  // Create a new booking
  static async create(req, res) {
    try {
      const booking = new Booking(req.body);
      await booking.save();
      res.status(201).json({ message: "Booking created", booking });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Get all bookings
  static async getAll(req, res) {
    try {
      const bookings = await Booking.find()
        .populate("user")
        .populate("room");
      res.status(200).json(bookings);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Get booking by ID
  static async getById(req, res) {
    try {
      const booking = await Booking.findById(req.params.id)
        .populate("user")
        .populate("room");
      if (!booking) return res.status(404).json({ message: "Booking not found" });
      res.status(200).json(booking);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Update booking by ID
  static async update(req, res) {
    try {
      const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updated) return res.status(404).json({ message: "Booking not found" });
      res.status(200).json({ message: "Booking updated", updated });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Delete booking
  static async delete(req, res) {
    try {
      const deleted = await Booking.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Booking not found" });
      res.status(200).json({ message: "Booking deleted" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = BookingController;
