const User = require('../models/users');
const {ObjectId} = require("mongoose").Types;

async function checkStaff(req, res, next) {
  const userId = ObjectId(req.userId);
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.role === "guest") return res.status(403).json({ message: "Forbidden" });
  req.user = user; // Attach user to request for further use
  next();
}

module.exports = checkStaff;