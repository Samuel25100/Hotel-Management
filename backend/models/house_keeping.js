const mongoose = require("mongoose");

const housekeepingSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Staff
  status: {
    type: String,
    enum: ["clean", "dirty", "in-progress"],
    default: "dirty"
  },
  notes: String,
  lastCleaned: { type: Date, default: null },
});

module.exports = mongoose.model("Housekeeping", housekeepingSchema);
