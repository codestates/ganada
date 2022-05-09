const { users, boards, chatrooms } = require("../models");
const { isAuthorized } = require("./tokenFunctions");

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      const searchPosts = await boards.findAll({
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
        ],
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: users,
            attributes: ["id", "name"],
          },
        ],
      });
      return res.json({ data: searchPosts, message: "조회 완료" });
    } catch (err) {
      return res.status(500).json({ message: "서버 에러입니다." });
    }
  },

  getPosts: async (req, res) => {
    try {
      const { id } = req.params;
      const searchPost = await boards.findOne({
        attributes: ["title", "description", "createdAt"],
        where: { id },
        include: [
          {
            model: users,
            attributes: ["name"],
          },
        ],
      });
      return res.status(200).json({ data: searchPost, message: "조회 성공" });
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  posts: async (req, res) => {
    // const userInfo = isAuthorized(req);
    const userInfo = 1;
    try {
      if (userInfo) {
        const {
          category,
          title,
          // image,
          description,
          // tags,
          latitude,
          longitude,
          mainAddress,
          detailAddress,
        } = req.body;
        const createPost = await boards.create({
          category,
          title,
          // image,
          description,
          // tags,
          latitude,
          longitude,
          // mainAddress,
          detailAddress,
          userId: userInfo.id,
        });
        if (createPost) {
          return res
            .status(200)
            .json({ data: createPost, message: "작성 완료" });
        }
      } else {
        res.status(401).json({ message: "권한이 없습니다." });
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  patchPosts: async (req, res) => {
    const userInfo = isAuthorized(req);

    if (userInfo) {
      try {
        const { id } = req.params;
        const searchPost = await boards.findOne({
          where: { id },
        });
        if (searchPost) {
          const {
            title,
            image,
            description,
            tags,
            sex,
            age,
            height,
            weight,
            latitude,
            longitude,
            mainAddress,
            detailAddress,
          } = req.body;
          if (userInfo.id === searchPost.dataValues.userId) {
            await boards.update(
              {
                title,
                image,
                description,
                tags,
                sex,
                age,
                height,
                weight,
                latitude,
                longitude,
                mainAddress,
                detailAddress,
              },
              {
                where: { id },
              }
            );
            return res
              .status(200)
              .json({ data: searchPost, message: "수정 완료" });
          }
        } else {
          return res.status(400).json({ message: "권한이 없습니다." });
        }
      } catch (err) {
        return res.status(500).json({ message: "서버 에러" });
      }
    }
  },

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

  // postReservations: async (req, res) => {
  //   try {
  //     const { status, boardId } = req.body;
  //     const createReservations = await reservations.create({
  //       status,
  //       boardId,
  //     });
  //     if (createReservations) {
  //       return res.status(200).json({ createReservations });
  //     }
  //   } catch (err) {
  //     return res.status(500).json({ message: "서버 에러" });
  //   }
  // },

  // finishReservations: async (req, res) => {
  //   try {
  //     const { boardId } = req.body;
  //     const existReservations = await reservations.findOne({
  //       where: { boardId },
  //     });
  //     if (existReservations) {
  //       const { status } = req.body;
  //       await reservations.update(
  //         {
  //           status,
  //         },
  //         {
  //           where: { boardId },
  //         }
  //       );
  //     }
  //     return res.status(200).json({ message: "업데이트 완료" });
  //   } catch (err) {
  //     return res.status(500).json({ message: "서버 에러" });
  //   }
  // },

  // deleteReservations: async (req, res) => {
  //   try {
  //     const { boardId } = req.body;
  //     const existReservations = await reservations.findOne({
  //       where: { boardId },
  //     });
  //     if (existReservations) {
  //       await reservations.destroy({
  //         where: { boardId },
  //       });
  //     }
  //     return res.status(200).json({ message: "삭제 완료" });
  //   } catch (err) {
  //     return res.status(500).json({ message: "서버 에러" });
  //   }
  // },

  createChat: async (req, res) => {
    const userInfo = isAuthorized(req);
    const { boardId } = req.params;
    if (userInfo) {
      try {
        const createChat = await chatrooms.create({
          boardId: boardId,
          userId: userInfo.id,
        });
        return res
          .status(200)
          .json({ data: createChat, message: "채팅방 생성" });
      } catch (err) {
        return res.status(500).json({ message: "서버 에러" });
      }
    }
  },
};
