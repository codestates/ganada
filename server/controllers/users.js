const { Users, reviews } = require("../models");

module.exports = {
  modifyUser: async (req, res) => {
    return res.status(200).json({ message: "ok" });
  },

  deleteUser: async (req, res) => {
    return res.status(200).json({ message: "ok" });
  },

  getUser: async (req, res) => {
    return res.status(200).json({ message: "ok" });
  },

  getReviews: async (req, res) => {
    try {
      // 1차 테스트 완료
      const { userId } = req.body;
      const checkReview = await reviews.findAll({
        attributes: ["kind", "time", "again"],
        where: { userId },
        include: [
          {
            model: Users,
            attributes: ["name"],
          },
        ],
      });
      return res.status(200).json({ data: checkReview, message: "검색 완료" });
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  postReviews: async (req, res) => {
    try {
      const { kind, time, again, userId } = req.body;
      const postReview = await reviews.create({
        kind,
        time,
        again,
        userId,
        include: [
          {
            model: Users,
            attributes: ["name"],
          },
        ],
      });
      return res.status(200).json({ data: postReview, message: "작성 완료" });
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },
};
