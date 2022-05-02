const { boards, reservations } = require("../models");

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
    try {
      const {
        title,
        description,
        image,
        photographerTag,
        latitude,
        longitude,
        detailAddress,
      } = req.body;
      const createPost = await boards.create({
        title,
        description,
        image,
        photographerTag,
        latitude,
        longitude,
        detailAddress,
      });
      if (createPost) {
        return res.status(201).json({ message: "작성 완료" });
      } else {
        return res.status(401).json({ message: "권한 없음" });
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  patchPosts: async (req, res) => {
    try {
      const { id } = req.params;
      const existBoards = await boards.findOne({
        where: { id },
      });
      if (existBoards) {
        const {
          title,
          description,
          image,
          photographerTag,
          latitude,
          longitude,
          detailAddress,
        } = req.body;
        // token 생성 된 후 if, else 분리하여 인증된 유저인지 확인하기
        await boards.update(
          {
            title,
            description,
            image,
            photographerTag,
            latitude,
            longitude,
            detailAddress,
          },
          {
            where: { id },
          }
        );
        return res.status(201).json({ message: "수정 완료" });
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  deletePosts: async (req, res) => {
    // token 생성 후 권한이 없는 사용자인지 분류하여 관리하기
    // 응답값 다시 한 번 확인하기
    try {
      const { id } = req.params;
      const existBoards = await boards.findOne({
        where: { id },
      });
      if (existBoards) {
        await boards.destroy({ where: { id } });
        return res.status.json({ message: "삭제 완료" });
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
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
