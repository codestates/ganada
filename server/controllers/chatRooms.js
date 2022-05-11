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
const { Op } = require("sequelize");

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
        const getAllChatRoom = await chatrooms.findAll({
          where: {
            [Op.or]: [{ hostId: userInfo.id }, { guestId: userInfo.id }],
          },
        });

        // const FilterData = getAllChatRoom.data.filter(
        //   (el) => el.guestId !== userInfo
        // );
        // const mapData = FilterData.map((el) => {
        //   return { ...el, userId: el.guestId };
        // });
        // const FilterData2 = getAllChatRoom.data.filter(
        //   (el) => el.hostId !== userInfo
        // );
        // const mapData2 = FilterData2.map((el) => {
        //   return { ...el, userId: el.hostId };
        // });
        // const mapData3 = [...mapData, ...mapData2];

        console.log(getAllChatRoom);
        return res.status(200).json({ data: { getAllChatRoom } });

        // //여기 보류
        // // const getAllChatRoom = await user_chatroom.findAll({
        // //   where: {
        // //     userId: userInfo.id,
        // //   },
        // // });
        // // const getAllChatRoomId = getAllChatRoom.map((v) => v.chatroomId);
        // // const findOpponentUser = await chatrooms.findAll({
        // //   where: {
        // //     id: {
        // //       [Op.in]: getAllChatRoomId,
        // //     },
        // //   },
        // // });
        // // 여기 보류 끝

        // // 접속자가 현재 1번 유저다.
        // const notHostUser = userInfo.id;
        // // 2번 유저와 3번 유저랑 채팅한적이 있으면 [16,17,18] --> 2,3
        // const oppoUser = getAllChatRoom.map((el) => el.id);
        // const findOpponentUser = await users.findAll({
        //   where: {
        //     [Op.not]: [{ id: userInfo.id }],
        //   },
        // });
        // // 접속한 사람이 1일 때 살아 있는 채팅방이면, chatrooms에서 상대방의 userId와 chatroomId가 필요하다.
        // // 접속한 사람(1번 유저는) 채팅방을 삭제하지 않은 상태다.
        // // 현재 샘플 데이터로는 [16,2],[17,2], [18,2], [20,3], [21,4], [22,5]

        // // findOpponentUser.hostId 또는 guestId가 userInfo.id와 다른 경우를 뽑으면?
        // // 1번 유저가 포함 된 상대방의 정보를 가져와야 한다.
        // const chatList = await chatrooms.findAll({
        //   where: {
        //     id: oppoUser,
        //   },
        // });
        // const chatListMap = chatList.map((el) => el.dataValues);
        // console.log(oppoUser);
        // 접속자가 hostId에 포함 된 경우 guestId 상대방을 찾고,
        // 접속자가 guestId에 포함 된 경우 hostId를 찾아라.
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "서버 에러" });
    }
  },
};
