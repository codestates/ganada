const router = require("express").Router();
const chatContentsController = require("../controllers/chatContents");

router.get("/:id", chatContentsController.getAllChatContents);

module.exports = router;
