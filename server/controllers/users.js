const { users, reviews } = require("../models");

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
      const { id } = req.params;
      const checkReview = await reviews.findOne({
        attributes: ["kind", "time", "again"],
        where: { id },
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
      await reviews.update(
        {
          kind: kind,
          time: time,
          again: again,
        },
        {
          where: { userId },
        }
      );
      return res.status(200).json({ message: "증가" });
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },
};
