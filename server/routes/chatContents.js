const router = require("express").Router();
const chatContentsController = require("../controllers/chatContents");

router.get("/:chatroomId", chatContentsController.getAllChatContents);

module.exports = router;
