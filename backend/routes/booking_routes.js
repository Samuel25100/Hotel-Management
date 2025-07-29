const express = require("express");
const router = express.Router();
const jwt_auth = require("../middleware/jwt_auth");
const BookingController = require("../controller/booking_cont");

router.post("/", jwt_auth, BookingController.create_booking);
router.get("/", jwt_auth, BookingController.getAll);
router.get("/:id", jwt_auth, BookingController.getById);
router.put("/:id", jwt_auth, BookingController.update);
router.delete("/:id", jwt_auth, BookingController.delete);

module.exports = router;