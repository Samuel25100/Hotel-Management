const express = require("express");
const router = express.Router();
const jwt_auth = require("../middleware/jwt_auth");
const HousekeepingController = require("../controller/houseKeeping_cont");
const checkStaff = require("../middleware/staff_gateKeeper");

router.post("/", jwt_auth, checkStaff, HousekeepingController.create);
router.get("/", jwt_auth, checkStaff, HousekeepingController.getAll);
router.get("/:id", jwt_auth, checkStaff, HousekeepingController.getById);
router.put("/:id", jwt_auth, checkStaff, HousekeepingController.update);
router.delete("/:id", jwt_auth, checkStaff, HousekeepingController.delete);

module.exports = router;