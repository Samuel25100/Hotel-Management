const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  guestsId: { type: mongoose.Schema.Types.ObjectId, ref: "Guests", default: null },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, default: 1 },
  status: {
    type: String,
    enum: ["pending", "confirmed", "checked-in", "checked-out", "cancelled"],
    default: "pending"
  },
  specialRequests: { type: String, default: "" },
  roomType: { type: String, enum: ["single", "double", "suite", "presidential"], default: "single"},
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
