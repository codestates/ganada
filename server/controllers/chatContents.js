const dotenv = require("dotenv");
const { chatcontents, users } = require("../models");
dotenv.config();
const { isAuthorized } = require("./tokenFunctions");

module.exports = {
  getAllChatContents: async (req, res) => {
    const userInfo = isAuthorized(req);
    const { chatroomId } = req.params;

    if (!userInfo) {
      return res.status(401).json({ message: "권한이 없습니다." });
    }
    try {
      const checkChatContents = await chatcontents.findAll({
        order: [["createdAt", "DESC"]],
        where: {
          chatroomId: chatroomId,
        },
        // include: [
        //   {
        //     model: users,
        //     attributes: ["image", "name"],
        //   },
        // ],
      });
      return res.status(200).json({ checkChatContents });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "서버 에러" });
    }
  },
};
