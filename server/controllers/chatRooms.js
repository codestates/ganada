// const chatRooms = require("../models/chatRooms");
const { boards, users } = require("../models");
const { user_chatroom, chatrooms, chatcontents } = require("../models");
const { isAuthorized } = require("./tokenFunctions");
const _ = require("lodash");
const { includes } = require("lodash");

module.exports = {
  createChat: async (req, res) => {
    // 로그인 검증을 제외한 상태에서 룸 먼저 만들기
    // const { boardId } = req.params;
    const userInfo = isAuthorized(req);
    const myId = userInfo.id;
    const opponentId = req.body.opponentId;

    // board 까지 연결해야한다.
    if (!userInfo) {
      return res.status(401).json({ message: "권한이 없습니다." });
    }

    try {
      const myChatRooms = await user_chatroom.findAll({
        where: {
          userId: myId,
        },
      });
      // opponent === 상대방
      const opponentChatRooms = await user_chatroom.findAll({
        where: {
          userId: opponentId,
        },
      });

      const myRoomList = myChatRooms.map(
        (chatroom) => chatroom.dataValues.chatroomId
      );

      const opponentRoomList = opponentChatRooms.map(
        (chatroom) => chatroom.dataValues.chatroomId
      );

      const isChatRoom = _.intersection(myRoomList, opponentRoomList);

      if (isChatRoom.length === 0) {
        const chatRoomInfo = await chatRooms.create({
          userId: myId,
        });

        await chatRoomInfo.addusers(myId);
        await chatRoomInfo.addusers(opponentId);

        return res.status(200).json({
          data: {
            chatroomId: chatRoomInfo.id,
            myId,
            opponentId,
          },
          message: "채팅방 생성 완료",
        });
      } else if (isChatRoom.length === 1) {
        return res.status(201).json({
          data: {
            chatroomId: isChatRoom[0],
            myId,
            opponentId,
          },
          message: "채팅방 생성 완료",
        });
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  deleteChat: async (req, res) => {
    const chatroomId = req.body.id;

    try {
      await user_chatroom.destroy({
        where: {
          chatroomId,
        },
      });

      await chatrooms.destroy({
        where: {
          id: chatroomId,
        },
      });

      // 채팅방 삭제 시 채팅방 chatcontents 삭제
      await chatcontents.destroy({
        where: {
          chatroomId,
        },
      });

      res.status(200).json({
        message: "해당 채팅방 관련 기록을 삭제합니다.",
      });
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  getAllChat: async (req, res) => {
    const userInfo = isAuthorized(req);
    const myId = userInfo.id;
    const data = [];

    if (!userInfo) {
      return res.status(401).json({ message: "권한이 없습니다." });
    }

    try {
      const userChatRoom = await user_chatroom.findAll({
        where: {
          userId: myId,
        },
      });

      if (userChatRoom.length !== 0) {
        for (let i = 0; i < userChatRoom.length; i++) {
          const roomInfo = await chatrooms.findOne({
            where: {
              id: userChatRoom[i].chatroomId,
            },
            include: [
              {
                model: users,
              },
            ],
          });
          const opponentInfoList = roomInfo.users.filter(
            (user) => user.id !== myId
          );

          opponentInfoList.forEach((opponentInfo) => {
            data.push({
              chatroomId: roomInfo.id,
              opponentId: opponentInfo.id,
              opponentEmail: opponentInfo.email,
              opponentName: opponentInfo.name,
              opponentImage: opponentInfo.image,
            });
          });
        }
        return res.status(200).json({
          data: data,
          message: "채팅방 조회 완료",
        });
      } else {
        return res.status(200).json({
          data: null,
          message: "채팅방이 존재하지 않습니다.",
        });
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },
};
