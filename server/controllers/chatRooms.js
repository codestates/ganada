const {
  user_chatroom,
  chatrooms,
  chatcontents,
  boards,
  users,
} = require("../models");
const { isAuthorized } = require("./tokenFunctions");
const _ = require("lodash");
const { includes } = require("lodash");

module.exports = {
  test: async (req, res) => {
    const { id } = req.params;
    try {
      const existBoard = await boards.findOne({
        attribute: ["title"],
        include: [
          {
            model: users,
            attribute: ["id", "name", "image"],
          },
        ],
        where: { id },
      });
      return res.status(200).json({ data: existBoard, message: "헬로" });
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  createChat: async (req, res) => {
    // 채팅을 post 하면 채팅방이 생성된다.
    try {
      const { boardId } = req.params;
      const existBoard = await boards.findOne({
        attribute: ["title", "status"],
        include: [
          {
            model: users,
            attribute: ["id", "name", "image"],
          },
        ],
        where: { boardId },
      });
      if (existBoard) {
        const { userId, boardId } = req.body;
        const posterId = existBoard.userId;
        const createChatRoom = await chatrooms.create({
          userId: posterId,
        });
      }
      return res.status(200).json({ data: createChatRoom });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  // 로그인 검증을 제외한 상태에서 룸 먼저 만들기
  // const userInfo = isAuthorized(req);
  // const myId = 1;
  // const opponentId = req.body.opponentId;
  // const { boardId } = req.params;
  // // board 까지 연결해야한다.
  // // if (!userInfo) {
  // //   return res.status(401).json({ message: "권한이 없습니다." });
  // // }
  // try {
  //   const existBoard = await boards.findOne({
  //     attribute: ["title"],
  //     include: [
  //       {
  //         model: users,
  //         attribute: ["id", "name", "image"],
  //       },
  //     ],
  //     where: { boardId },
  //   });
  //   // 유저인포, 게시글 번호
  //   const createChat = await chatrooms.create({
  //     userId,
  //     boardId,
  //   });
  //   const myChatRooms = await user_chatroom.findAll({
  //     where: {
  //       userId: myId,
  //     },
  //   });
  //   // opponent === 상대방
  //   const opponentChatRooms = await user_chatroom.findAll({
  //     where: {
  //       userId: opponentId,
  //     },
  //   });
  //   const myRoomList = myChatRooms.map(
  //     (chatroom) => chatroom.dataValues.chatroomId
  //   );
  //   const opponentRoomList = opponentChatRooms.map(
  //     (chatroom) => chatroom.dataValues.chatroomId
  //   );
  //   const isChatRoom = _.intersection(myRoomList, opponentRoomList);
  //   if (isChatRoom.length === 0) {
  //     const chatRoomInfo = await chatrooms.create({
  //       userId: myId,
  //     });
  //     await chatRoomInfo.addusers(myId);
  //     await chatRoomInfo.addusers(opponentId);
  //     return res.status(200).json({
  //       data: {
  //         chatroomId: chatRoomInfo.id,
  //         myId,
  //         opponentId,
  //       },
  //       message: "채팅방 생성 완료",
  //     });
  //   } else if (isChatRoom.length === 1) {
  //     return res.status(201).json({
  //       data: {
  //         chatroomId: isChatRoom[0],
  //         myId,
  //         opponentId,
  //       },
  //       message: "채팅방 생성 완료",
  //     });
  //   }
  // } catch (err) {
  //   return res.status(500).json({ message: "서버 에러" });
  // }
  // },

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
