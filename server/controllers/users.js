const { users, reviews } = require("../models");
const { isAuthorized } = require("./tokenFunctions");
const bcrypt = require("bcrypt");

module.exports = {
  changeInfo: async (req, res) => {
    const { name, phoneNumber, image } = req.body;
    const userInfo = isAuthorized(req);
    try {
      if (userInfo) {
        const getUser = await users.findOne({
          attributes: ["id", "name", "phoneNumber", "image"],
          where: { id: userInfo.id },
        });
        if (getUser) {
          await users.update(
            {
              name,
              phoneNumber,
              image,
            },
            {
              where: { id: userInfo.id },
            }
          );
          return res
            .status(200)
            .json({ data: getUser, message: "개인정보 수정 완료" });
        } else {
          return res.status(401).json({ message: "권한이 없습니다." });
        }
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  changePassword: async (req, res) => {
    const { password, currentPassword } = req.body;

    const userInfo = isAuthorized(req);
    try {
      if (userInfo) {
        const getUser = await users.findOne({
          attributes: ["id", "password"],
          where: { id: userInfo.id },
        });
        if (getUser) {
          if (userInfo.password !== currentPassword) {
            return res.status(401).json({ message: "비밀번호가 틀렸습니다." });
          } else {
            const hashed = await bcrypt.hash(password, 10);
            await users.update(
              {
                password: hashed,
              },
              {
                where: { id: userInfo.id },
              }
            );
          }
        }
        return res
          .status(200)
          .json({ data: getUser, message: "비밀번호 수정 완료" });
      } else {
        return res.status(401).json({ message: "권한이 필요합니다." });
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  deleteUser: async (req, res) => {
    const userInfo = isAuthorized(req);

    try {
      if (userInfo) {
        const getUser = await users.findOne({
          attributes: ["id", "email", "name", "phoneNumber"],
          where: { id: userInfo.id },
        });
        if (getUser) {
          await users.destroy({ where: { id: userInfo.id } });
          return res.status(200).json({ message: "삭제 완료" });
        }
      } else {
        return res.status(401).json({ message: "권한이 없습니다." });
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  getUser: async (req, res) => {
    const userInfo = isAuthorized(req);

    try {
      if (userInfo) {
        const getUser = await users.findOne({
          attributes: [
            "id",
            "email",
            "name",
            "password",
            "phoneNumber",
            "image",
          ],
          where: { id: userInfo.id },
        });
        if (getUser) {
          return res.status(200).json({ data: getUser, message: "조회 완료" });
        }
      } else {
        return res.status(401).json({ message: "권한이 없습니다." });
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
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
            model: users,
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
            model: users,
            attributes: ["name"],
          },
        ],
      });
      return res.status(200).json({ data: postReview, message: "작성 완료" });
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
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
            model: users,
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
