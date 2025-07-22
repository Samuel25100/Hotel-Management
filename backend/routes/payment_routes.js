const express = require("express");
const router = express.Router();
const jwt_auth = require("../middleware/jwt_auth");
const PaymentController = require("../controller/payment_cont");

router.post("/", jwt_auth, PaymentController.create);
router.get("/", jwt_auth, PaymentController.getAll);
router.get("/:id", jwt_auth, PaymentController.getById);
router.put("/:id", jwt_auth, PaymentController.update);
router.delete("/:id", jwt_auth, PaymentController.delete);

module.exports = router;