const dotenv = require("dotenv");
const {
  boards,
  chatrooms,
  user_chatroom,
  chatcontents,
  users,
} = require("../models");
const { isAuthorized } = require("./tokenFunctions");
dotenv.config();
const { Op, Model } = require("sequelize");

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
        // 접속자가 들어간 user_chatroom -> chatroomId를 알 수 있다.
        const list = await user_chatroom.findAll({
          where: {
            userId: userInfo.id,
          },
        });
        const chatList = list.map((el) => el.dataValues);
        const roomsId = chatList.map((el) => el.chatroomId); // 접속자가 속해 있는 chatroomId만 정렬 [16,17,18,20,21,22]
        const roomList = await chatrooms.findAll({
          where: {
            id: {
              [Op.in]: roomsId,
            },
          },
        });
        const roomsList = roomList.map((el) => el.dataValues);
        const hostId = roomsList
          .map((el) => el.hostId)
          .filter((ele) => ele !== userInfo.id);
        const guestId = roomsList
          .map((el) => el.guestId)
          .filter((ele) => ele !== userInfo.id);
        const hostUser = await users.findAll({
          where: {
            id: {
              [Op.in]: hostId,
            },
          },
        });
        const guestUser = await users.findAll({
          where: {
            id: {
              [Op.in]: guestId,
            },
          },
        });
        const hostUserList = hostUser.map((el) => el.dataValues);
        const guestUserList = guestUser.map((el) => el.dataValues);

        for (let i = 0; i < roomsList.length; i++) {
          for (let j = 0; j < hostUserList.length; j++) {
            if (roomsList[i].hostId === hostUserList[j].id) {
              roomsList[i].name = hostUserList[j].name;
              roomsList[i].image = hostUserList[j].image;
            }
          }
        }
        for (let i = 0; i < roomsList.length; i++) {
          for (let j = 0; j < guestUserList.length; j++) {
            if (roomsList[i].guestId === guestUserList[j].id) {
              roomsList[i].name = guestUserList[j].name;
              roomsList[i].image = guestUserList[j].image;
            }
          }
        }

        const roomId = roomsList.map((el) => el.id);

        const chatting = await chatcontents.findAll({
          where: {
            chatroomId: {
              [Op.in]: roomId,
            },
          },
        });
        const chattings = chatting.map((el) => el.dataValues);
        const chattingsMatch = {};
        for (let i = 0; i < roomsList.length; i++) {
          for (let j = 0; j < chattings.length; j++) {
            if (
              chattingsMatch[roomsList[i].id] === undefined &&
              roomsList[i].id === chattings[j].chatroomId
            ) {
              chattingsMatch[roomsList[i].id] = [chattings[j].id];
            } else if (roomsList[i].id === chattings[j].chatroomId) {
              chattingsMatch[roomsList[i].id].push(chattings[j].id);
            }
          }
        }
        for (let i = 0; i < roomsList.length; i++) {
          for (let j = 0; j < chattings.length; j++) {
            for (let key in chattingsMatch) {
              if (
                roomsList[i].id === chattings[j].chatroomId &&
                chattings[j].id === Math.max(...chattingsMatch[key])
              ) {
                roomsList[i].chats = chattings[j].chats;
                roomsList[i].date = chattings[j].updatedAt;
              }
            }
          }
        }
        const result = roomsList;
        return res.status(200).json({ data: result, message: "작동" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "서버 에러" });
    }
  },
};
