const Payment = require("../models/payment");

class PaymentController {
  // Create a new payment
  static async create(req, res) {
    try {
      const payment = new Payment(req.body);
      await payment.save();
      res.status(201).json({ message: "Payment created", payment });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Get all payments
  static async getAll(req, res) {
    try {
      const payments = await Payment.find()
        .populate("user")
        .populate("booking");
      res.status(200).json(payments);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Get payment by ID
  static async getById(req, res) {
    try {
      const payment = await Payment.findById(req.params.id)
        .populate("user")
        .populate("booking");
      if (!payment) return res.status(404).json({ message: "Payment not found" });
      res.status(200).json(payment);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Update payment
  static async update(req, res) {
    try {
      const updated = await Payment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updated) return res.status(404).json({ message: "Payment not found" });
      res.status(200).json({ message: "Payment updated", updated });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Delete payment
  static async delete(req, res) {
    try {
      const deleted = await Payment.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Payment not found" });
      res.status(200).json({ message: "Payment deleted" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = PaymentController;
