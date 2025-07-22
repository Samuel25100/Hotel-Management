const express = require("express");
const jwt_auth = require("../middleware/jwt_auth");
const router = express.Router();
const RoomController = require("../controller/room_cont");

router.post("/", jwt_auth, RoomController.create);
router.get("/",  jwt_auth, RoomController.getAll);
router.get("/:id", jwt_auth, RoomController.getById);
router.put("/:id", jwt_auth, RoomController.update);
router.delete("/:id", jwt_auth, RoomController.delete);

module.exports = router;