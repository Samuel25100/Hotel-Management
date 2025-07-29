const Booking = require("../models/booking");
const Users = require("../models/users");
const { ObjectId } = require("mongodb");
const Rooms = require("../models/rooms");


class BookingController {
  // Create a new booking
  static async create_booking(req, res) {
    try {
      const userId = new ObjectId(req.userId);
      const userdb = await Users.findById(userId);
      if (!userdb) {
        return res.status(404).json({ error: "User not found" });
      }
      const { room, checkIn, checkOut, guests} = req.body;
      let totalPrice = 0;
      if (!userId || !room || !checkIn || !checkOut) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const roomdb = await Rooms.findById(new ObjectId(room));
      if (!roomdb) return res.status(404).json({ "message": "Room not found" });
      if (roomdb.isAvailable === false) {
        return res.status(400).json({ "message": "Room is not available for booking" });
      } else {
        // Update room status to booked
        await Rooms.findByIdAndUpdate(new ObjectId(room), { isAvailable: false });
      }
      // Check room's guest limit
      if (guests) {
        if (guests > roomdb.capacity) {
          return res.status(400).json({ "message": "Number of guests exceeds room capacity" });
        }
      }

      // Calculate total price based on room price and number of nights
      const checkInTime = new Date(checkIn);
      const checkOutTime = new Date(checkOut);
      const service_hr = (checkOutTime - checkInTime) / (1000 * 60 * 60);
      const service = parseInt(service_hr / 24);
      console.log("time cal:", service, service_hr);
      if (service == 0) {
          totalPrice = roomdb.price;
      } else if (service >= 1) {
          totalPrice = roomdb.price * service;
      }
      // Create booking
      const booking = await Booking.create({ user: userId, room, checkIn, checkOut, guests, totalPrice });
      return res.status(201).json({ message: "Booking created", booking });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Get all bookings
  static async getAll(req, res) {
    try {
        const userId = new ObjectId(req.userId);
        const userdb = await Users.findById(userId);
        if (userdb.role !== "admin") {
          const bookings = await Booking.find({ user: userId }).select("-__v -createdAt -updatedAt -user ");
          if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
          }
          return res.status(200).json({ bookings });
        // Admin can view all bookings
        } else if (userdb.role === "admin") {
          const bookings = await Booking.find().select("-__v -createdAt -updatedAt")
            .populate({ path: "user", select: "-__v -createdAt -pwd -updatedAt -role" })
            .populate({ path: "room", select: "-__v -createdAt -updatedAt -description" });
          if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
          }
          return res.status(200).json({ "number of booking": bookings.length, bookings });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
  }

  // Get booking by ID
  static async getById(req, res) {
    try {
      const userId = new ObjectId(req.userId);
      const userdb = await Users.findById(userId);
      if (userdb.role !== "admin") {
        const booking = await Booking.find({user: userId, _id: new ObjectId(req.params.id)}).select("-__v -createdAt -updatedAt");

        /*.populate({ path: "user", select: "-__v -createdAt -pwd -updatedAt -role" })
        .populate({ path: "room", select: "-__v -createdAt -updatedAt -isAvailable" });*/
        
        if (!booking || booking.length === 0) return res.status(404).json({ message: "Booking not found" });
        return res.status(200).json(booking);
      } else if (userdb.role === "admin") {
          const booking = await Booking.findById(new ObjectId(req.params.id)).select("-__v -createdAt -updatedAt")
            .populate({ path: "user", select: "-__v -createdAt -pwd -updatedAt" })
            .populate({ path: "room", select: "-__v -createdAt -updatedAt" });
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
      const userId = new ObjectId(req.userId);
      const booking = await Booking.findById(new ObjectId(req.params.id));
      if (!booking) return res.status(404).json({"message": "Booking not found"});
      
      const userdb = await Users.findById(userId);
      if (userId.toString() === booking.user.toString()) {
        const guests = req.body.guests;
        if (guests) {
          const roomdb = await Rooms.findById(booking.room);
          if (guests > roomdb.capacity) {
            return res.status(400).json({ "message": "Number of guests exceeds room capacity" });
          }
        }
        const updated = await Booking.findOneAndUpdate({ _id: new ObjectId(req.params.id), user: userId }, req.body,
        {
          new: true,
          runValidators: true,
        });
        if (!updated) return res.status(404).json({ message: "Booking not found" });
        return res.status(200).json({ message: "Booking updated", updated });  
      } else if (userdb.role === "admin") {
        const guests = req.body.guests;
        if (guests) {
          const roomdb = await Rooms.findById(booking.room);
          if (guests > roomdb.capacity) {
            return res.status(400).json({ "message": "Number of guests exceeds room capacity" });
          }
        }
        const updated = await Booking.findByIdAndUpdate(new ObjectId(req.params.id), req.body, {
          new: true,
          runValidators: true,
        });
        if (!updated) return res.status(404).json({ message: "Booking not found"});
        return res.status(200).json({ message: "Booking updated", updated });
      }
      return res.status(403).json({ message: "Unauthorized" });
    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: err.message });
    }
  }

  // Delete booking
  static async delete(req, res) {
    try {
      const userId = new ObjectId(req.userId);
      const userdb = await Users.findById(userId);
      if (userdb.role === "admin") {
          const booking = await Booking.findById(new ObjectId(req.params.id));
          if (!booking) return res.status(404).json({ message: "Booking not found" });
          const deleted = await Booking.findByIdAndDelete(new ObjectId(req.params.id));
          if (!deleted) return res.status(404).json({ message: "Booking not deleted" });
          return res.status(200).json({ message: "Booking deleted" });
      } else {
          const booking = await Booking.find({user: userId, _id: new ObjectId(req.params.id)});
          if (!booking || booking.length === 0) {
            return res.status(403).json({ message: "Unauthorized" });
          }
          const deleted = await Booking.findByIdAndDelete(new ObjectId(req.params.id));
          if (!deleted) return res.status(404).json({ message: "Booking not deleted" });
          return res.status(200).json({ message: "Booking deleted" });
      }
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = BookingController;
