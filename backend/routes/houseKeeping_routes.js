const express = require("express");
const router = express.Router();
const jwt_auth = require("../middleware/jwt_auth");
const HousekeepingController = require("../controller/houseKeeping_cont");

router.post("/", jwt_auth, HousekeepingController.create);
router.get("/", jwt_auth, HousekeepingController.getAll);
router.get("/:id", jwt_auth, HousekeepingController.getById);
router.put("/:id", jwt_auth, HousekeepingController.update);
router.delete("/:id", jwt_auth, HousekeepingController.delete);

module.exports = router;