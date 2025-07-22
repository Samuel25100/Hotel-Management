const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true }, // e.g. "101"
  type: { type: String, required: true }, // e.g. "single", "double", "suite"
  price: { type: Number, required: true },
  description: String,
  capacity: Number,
  amenities: [String], // e.g. ["AC", "TV", "WiFi"]
  isAvailable: { type: Boolean, default: true },
  images: [String], // URLs
});

module.exports = mongoose.model("Room", roomSchema);
