const router = require("express").Router();
const chatRoomsController = require("../controllers/chatRooms");

router.post("/", chatRoomsController.createChat);
router.delete("/:boardId", chatRoomsController.deleteChat);

module.exports = router;
