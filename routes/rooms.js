const express = require("express");
const router = express.Router();
const roomsController = require("../controllers/rooms");

// TODO Finish this
router.post("/", roomsController.create);
router.get("/", roomsController.getAll);
router.get("/:id", roomsController.getById);
router.put("/:id", roomsController.update);
router.delete("/:id", roomsController.delete);

module.exports = router;
