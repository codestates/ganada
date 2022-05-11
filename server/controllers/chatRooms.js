const dotenv = require("dotenv");
const { boards, chatrooms, user_chatroom, chatcontents } = require("../models");
const { isAuthorized } = require("./tokenFunctions");
const users = require("./users");
dotenv.config();

module.exports = {
  createRoom: async (req, res) => {
    // chatrooms 안에 데이터 하나
    // user_chatrooms 안에 데이터 하나
    const { id } = req.body;
    const userInfo = isAuthorized(req);
    try {
      if (!userInfo) {
        return res.status(403).json({ message: "권한이 없습니다." });
      } else {
        const checkBoards = await boards.findOne({
          where: { id },
        });

        const hostId = checkBoards.dataValues.userId;
        if (hostId === userInfo.id) {
          return res
            .status(403)
            .json({ message: "본인에게는 메시지를 보낼 수 없습니다." });
        }

        const checkRoom = await chatrooms.findOne({
          where: {
            hostId,
            guestId: userInfo.id,
          },
        });

        if (!checkRoom) {
          // 둘 다 채팅방이 없는 경우
          const createRoom = await chatrooms.create({
            hostId: hostId, //게시글 작성자
            guestId: userInfo.id, // 채팅을 신청한 사람
          });
          // .then((res) => res.dataValues.id);
          const createdRoom = createRoom.dataValues.id;
          const createGuestRoom = await user_chatroom.create({
            userId: userInfo.id,
            chatroomId: createdRoom,
          });

          const createHostRoom = await user_chatroom.create({
            userId: hostId,
            chatroomId: createdRoom,
          });
          return res.status(200).json({
            data: { createGuestRoom, createHostRoom },
            message: "채팅방이 생성됐습니다.",
          });
        } else {
          const checkGuestRoom = await user_chatroom.findOne({
            where: {
              chatroomId: checkRoom.dataValues.id,
              userId: userInfo.id,
            },
          });

          const checkHostRoom = await user_chatroom.findOne({
            where: {
              chatroomId: checkRoom.dataValues.id,
              userId: hostId,
            },
          });

          if (!checkGuestRoom && !checkHostRoom) {
            const createGuestRoom = await user_chatroom.create({
              userId: userInfo.id,
              chatroomId: checkRoom.dataValues.id,
            });

            const createHostRoom = await user_chatroom.create({
              userId: hostId,
              chatroomId: checkRoom.dataValues.id,
            });
            return res.status(200).json({
              data: { createGuestRoom, createHostRoom },
              message: "채팅방이 생성됐습니다.",
            });
          } else if (!checkGuestRoom) {
            const createGuestRoom = await user_chatroom.create({
              userId: userInfo.id,
              chatroomId: checkRoom.dataValues.id,
            });
            return res.status(200).json({
              createGuestRoom,
              message: "발신자 채팅방 생성됐습니다.",
            });
          } else if (!checkHostRoom) {
            const createHostRoom = await user_chatroom.create({
              userId: hostId,
              chatroomId: checkRoom.dataValues.id,
            });
            return res
              .status(200)
              .json({ createHostRoom, message: "글쓴이 채팅방 생성됐습니다." });
          }
          return res.status(401).json({
            data: checkRoom.dataValues.id,
            message: "이미 채팅방이 존재합니다.",
          });
        }
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  deleteRoom: async (req, res) => {
    const { chatroomId } = req.params;
    const userInfo = isAuthorized(req);

    try {
      if (!userInfo) {
        return res.status(403).json({ message: "서버 에러" });
      } else {
        const deleteRoom = await user_chatroom.destroy({
          where: {
            chatroomId: chatroomId,
            userId: userInfo.id,
          },
        });
        return res
          .status(200)
          .json({ data: deleteRoom, message: "채팅방 삭제 완료" });
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  getAllChatRoom: async (req, res) => {
    const userInfo = isAuthorized(req);
    try {
      if (!userInfo) {
        return res.status(401).json({ message: "권한이 없습니다." });
      } else {
        const getAllChatRoom = await user_chatroom.findAll({
          where: { userId: userInfo.id },
          include: [
            {
              model: user_chatroom,
            },
          ],
        });
        return res.status(200).json({ data: getAllChatRoom });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "서버 에러" });
    }
  },
};
