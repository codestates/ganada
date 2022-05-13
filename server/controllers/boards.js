// const { users, boards, reservations, chatRooms } = require("../models");
const { users, boards, chatrooms } = require("../models");
const { isAuthorized } = require("./tokenFunctions");

module.exports = {
  getAllPosts: async (req, res) => {
    let { category, keyword, tags } = req.query;
    if (category === "model") {
      category = 1;
    } else {
      category = 0;
    }
    try {
      const searchPosts = await boards.findAll({
        where: {
          category,
        },
        attributes: [
          "id",
          "category",
          "title",
          "description",
          "tags",
          "latitude",
          "longitude",
          "mainAddress",
          "detailAddress",
          "image",
        ],
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: users,
            attributes: ["id", "name"],
          },
        ],
      });
      let toArrSearchPosts = searchPosts.map((post) => {
        return { ...post, tags: post.tags.split(",") };
      });
      toArrSearchPosts = toArrSearchPosts.map((post) => {
        return post.dataValues;
      });

      const arrTags = tags.split(",");
      const totalData = toArrSearchPosts.filter((post) => {
        const filtered = [];
        arrTags.forEach((tag) => {
          if (post.tags.indexOf(tag) !== -1) {
            filtered.push(tag);
          }
        });
        if (filtered.length === arrTags.length) {
          return 1;
        }
      });

      const finalData = totalData.filter((post) => {
        return (
          post.mainAddress.includes(keyword) ||
          post.detailAddress.includes(keyword)
        );
      });
      return res.json({ data: finalData, message: "조회 완료" });
    } catch (err) {
      return res.status(500).json({ message: "서버 에러입니다." });
    }
  },

  getPosts: async (req, res) => {
    try {
      const { id } = req.params;
      const searchPost = await boards.findOne({
        attributes: [
          "title",
          "description",
          "createdAt",
          "image",
          "tags",
          "latitude",
          "longitude",
          "mainAddress",
          "detailAddress",
        ],
        where: { id },
        include: [
          {
            model: users,
            attributes: ["name", "kind", "time", "again", "image"],
          },
        ],
      });
      return res.status(200).json({ data: searchPost, message: "조회 성공" });
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  getMyPosts: async (req, res) => {
    try {
      const { id } = req.params;
      const searchPost = await boards.findAll({
        where: { userId: id },
      });
      return res.status(200).json({ data: searchPost, message: "조회 성공" });
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  // patchPosts: async (req, res) => {
  //   const userInfo = isAuthorized(req);

  //   if (userInfo) {
  //     try {
  //       const { id } = req.params;
  //       const searchPost = await boards.findOne({
  //         where: { id },
  //       });
  //       if (searchPost) {
  //         const {
  //           title,
  //           image,
  //           description,
  //           tags,
  //           latitude,
  //           longitude,
  //           mainAddress,
  //           detailAddress,
  //         } = req.body;
  //         if (userInfo.id === searchPost.dataValues.userId) {
  //           await boards.update(
  //             {
  //               title,
  //               image,
  //               description,
  //               tags,
  //               latitude,
  //               longitude,
  //               mainAddress,
  //               detailAddress,
  //             },
  //             {
  //               where: { id },
  //             }
  //           );
  //           return res
  //             .status(200)
  //             .json({ data: searchPost, message: "수정 완료" });
  //         }
  //       } else {
  //         return res.status(400).json({ message: "권한이 없습니다." });
  //       }
  //     } catch (err) {
  //       return res.status(500).json({ message: "서버 에러" });
  //     }
  //   }
  // },

  deletePosts: async (req, res) => {
    const userInfo = isAuthorized(req);
    if (userInfo) {
      try {
        const { id } = req.params;
        const searchPost = await boards.findOne({
          where: { id },
        });
        if (searchPost) {
          if (userInfo.id === searchPost.dataValues.userId) {
            await boards.destroy({ where: { id } });
            res.status(200).json({ message: "삭제 완료" });
          } else {
            return res.status(400).json({ message: "권한이 없습니다." });
          }
        }
      } catch (err) {
        return res.status(500).json({ message: "서버 에러" });
      }
    }
  },

  createChat: async (req, res) => {
    const { boardId } = req.params;
    try {
      const createChat = await chatrooms.create({
        boardId: boardId,
        userId: 1,
      });
      console.log(boardId);
      return res.status(200).json({ data: createChat, message: "채팅방 생성" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  changeBoardStatus: async (req, res) => {
    // 게시글 작성자는 예약하기를 누를 수 없습니다.
    const userInfo = isAuthorized(req);
    const { id } = req.params;
    const { status } = req.body;
    // status가 0인 경우 게시글 작성자는 예약하기를 누를 수 없습니다.
    // 게시글 작성자가 아닌 경우 예약하기를 누를 수 있습니다.
    try {
      const existBoard = await boards.findOne({
        attributes: ["userId", "status"],
        where: { id },
      });
      // 게시글 상태가 예약하기(0)이고, 게시글 작성자가 예약하기를 누르려고 할 때
      if (existBoard.userId === userInfo.id && existBoard.status === 0) {
        return res
          .status(401)
          .json({ message: "예약하기는 상대방만 누를 수 있습니다." });
      } else if (existBoard.userId !== userInfo.id && existBoard.status === 0) {
        // 게시글 상태 예약하기(0)이고, 게시글 작성자가 아닐경우 예약을 할 수 있습니다.
        const updateBoardStatus = await boards.update(
          {
            status: existBoard.dataValues.status + status,
          },
          {
            where: { id },
          }
        );
        return res
          .status(200)
          .json({ data: updateBoardStatus, message: "예약 신청했습니다." });
      } else if (existBoard.userId === userInfo.id && existBoard.status === 1) {
        // 예약 수락(1)은 게시글 작성자만 누를 수 있습니다.
        const updateBoardStatus = await boards.update(
          {
            status: existBoard.dataValues.status + status,
          },
          {
            where: { id },
          }
        );
        return res
          .status(200)
          .json({ data: updateBoardStatus, message: "예약을 수락했습니다." });
      } else if (existBoard.userId !== userInfo.id && existBoard.status === 1) {
        // 예약 수락(1)상태는 게시글 작성자가 아니면 누를 수 없습니다.
        const updateBoardStatus = await boards.update(
          {
            status: existBoard.dataValues.status + status,
          },
          {
            where: { id },
          }
        );
        return res.status(200).json({
          data: updateBoardStatus,
          message: "예약 수락은 게시글 작성자만 할 수 있습니다.",
        });
      } else if (existBoard.status === 2) {
        // 촬영 종료는 둘다 할 수 있습니다. (둘 다 누른 경우)
        const updateBoardStatus = await boards.update(
          {
            status: existBoard.dataValues.status + status,
          },
          {
            where: { id },
          }
        );
        return res.status(200).json({
          data: updateBoardStatus,
          message: "촬영이 종료 됐습니다.",
        });
      } else {
        const updateBoardStatus = await boards.update(
          {
            // 취소의 경우 status가 - 입니다. 주의해주세요.
            status: existBoard.dataValues.status - status,
          },
          {
            where: { id },
          }
        );
        return res.status(200).json({
          data: updateBoardStatus,
          message: "촬영이 취소 됐습니다.",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "서버 에러" });
    }
  },
};
