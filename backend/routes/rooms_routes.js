const express = require("express");
const jwt_auth = require("../middleware/jwt_auth");
const router = express.Router();
const RoomController = require("../controller/room_cont");
const { checkStaff, Only_Admin } = require("../middleware/staff_gateKeeper");

router.post("/", jwt_auth, Only_Admin, RoomController.create);
router.get("/",  jwt_auth, RoomController.getAll);
router.get("/:number", jwt_auth, RoomController.getByNumber);
router.put("/:number", jwt_auth, checkStaff, RoomController.update);
router.delete("/:number", jwt_auth, checkStaff, RoomController.delete);

module.exports = router;