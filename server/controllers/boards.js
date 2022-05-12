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
};
