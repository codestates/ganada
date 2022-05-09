const dotenv = require("dotenv");
const { chatContents, users } = require("../models");
dotenv.config();
const { isAuthorized } = require("./tokenFunctions");

module.exports = {
  getAllChatContents: async (req, res) => {
    const userInfo = isAuthorized(req);
    const chatroomId = req.params.id;

    if (!userInfo) {
      return res.status(401).json({ message: "권한이 없습니다." });
    }

    try {
      const chatsData = await chatContents.findAll({
        where: {
          chatroomId: chatroomId,
        },
        include: [
          {
            // import 시 자꾸 대문자로 지 맘대로 변환
            model: users,
            attributes: ["id", "name", "image"],
          },
        ],
      });
      return res.status(200).json({
        data: chatsData,
        message: "채팅 기록 조회 완료",
      });
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },
};
