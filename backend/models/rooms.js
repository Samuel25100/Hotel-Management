const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true }, // e.g. "101"
  type: { type: String, required: true }, // e.g. "single", "double", "suite"
  price: { type: Number, required: true },
  description: { type: String },
  capacity: { type: Number },
  amenities: { type: [String], default: [] }, // e.g. ["AC", "TV", "WiFi"]
  isAvailable: { type: Boolean, default: true },
  images: { type: [String], default: [] }, // URLs
});

module.exports = mongoose.model("Room", roomSchema);
