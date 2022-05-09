// const chatRooms = require("../models/chatRooms");
const { boards, users } = require("../models");
const { isAuthorized } = require("./tokenFunctions");

module.exports = {
  createChat: async (req, res) => {
    // 로그인 검증을 제외한 상태에서 룸 먼저 만들기
    // const { boardId } = req.params;
    const userInfo = isAuthorized(req);
    if (userInfo) {
      try {
        const createChat = await chatRooms.create({
          //   boardId: boardId,
          userId: userInfo.id,
        });
        if (createChat) {
          return res
            .status(200)
            .json({ data: createChat, message: "채팅방 생성" });
        }
      } catch (err) {
        return res.status(500).json({ message: "서버 에러" });
      }
    } else {
      return res.status(400).json({ message: "권한이 없습니다." });
    }
  },

  deleteChat: async (req, res) => {
    return res.end();
  },
};
