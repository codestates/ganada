const { boards, reservations } = require("../models");
const { isAuthorized } = require("./tokenFunctions");

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      const findAllPosts = await boards.findAll({
        order: [["createdAt", "DESC"]],
        // users에서 user 정보 가져와야 한다.
      });
      return res.status(200).json({ data: findAllPosts, message: "조회 완료" });
      //데이터가 없는 경우 데이터 없음을 표시해야 한다.
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  getPosts: async (req, res) => {
    try {
      const { id } = req.params;
      const searchPost = await boards.findOne({
        where: { id },
        // 유저 정보, 유저 평점 조회하기
      });
      return res.status(200).json({ data: searchPost, message: "조회 성공" });
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  posts: async (req, res) => {
    const userInfo = isAuthorized(req);
    try {
      if (userInfo) {
        const {
          category,
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
        const createPost = await boards.create({
          category,
          title,
          image,
          description,
          // tags,
          sex,
          age,
          height,
          weight,
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

  postReservations: async (req, res) => {
    try {
      const { status, boardId } = req.body;
      const createReservations = await reservations.create({
        status,
        boardId,
      });
      if (createReservations) {
        return res.status(200).json({ createReservations });
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  finishReservations: async (req, res) => {
    try {
      const { boardId } = req.body;
      const existReservations = await reservations.findOne({
        where: { boardId },
      });
      if (existReservations) {
        const { status } = req.body;
        await reservations.update(
          {
            status,
          },
          {
            where: { boardId },
          }
        );
      }
      return res.status(200).json({ message: "업데이트 완료" });
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  deleteReservations: async (req, res) => {
    try {
      const { boardId } = req.body;
      const existReservations = await reservations.findOne({
        where: { boardId },
      });
      if (existReservations) {
        await reservations.destroy({
          where: { boardId },
        });
      }
      return res.status(200).json({ message: "삭제 완료" });
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },
};
