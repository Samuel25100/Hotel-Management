const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    roomId: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
});

module.exports = mongoose.model("Guests", bookingSchema);