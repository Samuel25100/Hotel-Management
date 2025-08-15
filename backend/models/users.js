const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true },
  pwd: { type: String, required: true }, // Hashed
  role: { type: String, enum: ["guest", "admin", "staff"], default: "guest" },
  createdAt: { type: Date, default: Date.now },
  images: { type: [String], default: [] }, // URLs
});

module.exports = mongoose.model("User", userSchema);
