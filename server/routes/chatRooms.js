const router = require("express").Router();
const chatRoomsController = require("../controllers/chatRooms");

// 채팅방 생성
router.post("/", chatRoomsController.createRoom);
router.delete("/:chatroomId", chatRoomsController.deleteRoom);
router.get("/", chatRoomsController.getAllChatRoom);
router.put("/:chatRoomId", chatRoomsController.changeStatusChatRoom);

module.exports = router;
