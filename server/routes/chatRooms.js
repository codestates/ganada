const router = require("express").Router();
const chatRoomsController = require("../controllers/chatRooms");

// 상황에 따라 경로 수정이 필요합니다. (잠시 보류)
router.post("/", chatRoomsController.createChat);
router.delete("/", chatRoomsController.deleteChat);
router.get("/", chatRoomsController.getAllChat);

module.exports = router;
