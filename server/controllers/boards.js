const { boards } = require("../models");

module.exports = {
  getAllPosts: async (req, res) => {
    return res.status(200).json({ message: "ok" });
  },

  getPosts: async (req, res) => {
    return res.status(200).json({ message: "ok" });
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
      const isCreated = await boards.create({
        title,
        description,
        image,
        photographerTag,
        latitude,
        longitude,
        detailAddress,
      });
      if (isCreated) {
        return res.status(201).json({ message: "작성 완료" });
      } else {
        return res.status(401).json({ message: "권한 없음" });
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  patchPosts: async (req, res) => {
    return res.status(200).json({ message: "ok" });
  },

  deletePosts: async (req, res) => {
    return res.status(200).json({ message: "ok" });
  },
};
