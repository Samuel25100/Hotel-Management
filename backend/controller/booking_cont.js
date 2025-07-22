const Booking = require("../models/booking");
const Users = require("../models/users_db");
const { ObjectId } = require("mongodb");
const Rooms = require("../models/rooms_db");


class BookingController {
  // Create a new booking
  static async create(req, res) {
    try {
      const userId = req.userId;
      const userdb = await Users.findById(userId);
      if (!userdb) {
        return res.status(404).json({ error: "User not found" });
      }
      const { room, checkIn, checkOut, guests } = req.body;
      if (!userId || !room || !checkIn || !checkOut || !guests) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const booking = await Booking.create({ user: ObjectId(userId), room, checkIn, checkOut, guests });
      res.status(201).json({ message: "Booking created", booking });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Get all bookings
  static async getAll(req, res) {
    try {
        const userId = req.userId;
        const userdb = await Users.findById(userId);
        if (userdb.role !== "admin") {
          const bookings = await Booking.find({ user: ObjectId(userId) })
            .populate("user")
            .populate("room");
          if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
          }
          return res.status(200).json(bookings);
        // Admin can view all bookings
        } else if (userdb.role === "admin") {
          const bookings = await Booking.find()
            .populate("user")
            .populate("room");
          if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
          }
          return res.status(200).json(bookings);
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
  }

  // Get booking by ID
  static async getById(req, res) {
    try {
      const userId = req.userId;
      const userdb = await Users.findById(userId);
      if (userdb.role !== "admin") {
        const booking = await Booking.find({user: ObjectId(userId), _id: ObjectId(req.params.id)})
        .populate("user")
        .populate("room");
        if (!booking) return res.status(404).json({ message: "Booking not found" });
        return res.status(200).json(booking);
      } else if (userdb.role === "admin") {
          const booking = await Booking.findById(req.params.id)
            .populate("user")
            .populate("room");
          if (!booking) return res.status(404).json({ message: "Booking not found" });
          return res.status(200).json(booking);
      }
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Update booking by ID
  static async update(req, res) {
    try {
      const userId = req.userId;
      const userdb = await Users.findById(ObjectId(userId));
      const booking = await Booking.findById(req.params.id);
      if (userId === booking.user.toString()) {
        const updated = await Booking.findOneAndUpdate({ _id: ObjectId(req.params.id), user: ObjectId(userId) }, req.body,
        {
          new: true,
          runValidators: true,
        });
        if (!updated) return res.status(404).json({ message: "Booking not found" });
        return res.status(200).json({ message: "Booking updated", updated });  
      } else if (userdb.role === "admin") {
        const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updated) return res.status(404).json({ message: "Booking not found"});
        return res.status(200).json({ message: "Booking updated", updated });
      }
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Delete booking
  static async delete(req, res) {
    try {
      const userId = req.userId;
      const userdb = await Users.findById(userId);
      if (userdb.role === "admin") {
          const booking = await Booking.findById(req.params.id);
          if (!booking) return res.status(404).json({ message: "Booking not found" });
          const deleted = await Booking.findByIdAndDelete(req.params.id);
          if (!deleted) return res.status(404).json({ message: "Booking not deleted" });
          return res.status(200).json({ message: "Booking deleted" });
      } else if (userdb.role !== "admin") {
          const booking = await Booking.find({user: ObjectId(userId), _id: ObjectId(req.params.id)});
          if (!booking || booking.length === 0) {
            return res.status(403).json({ message: "Unauthorized" });
          }
          const deleted = await Booking.findByIdAndDelete(req.params.id);
          if (!deleted) return res.status(404).json({ message: "Booking not deleted" });
          return res.status(200).json({ message: "Booking deleted" });
      }
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = BookingController;
