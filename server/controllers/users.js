// const { users, reviews } = require("../models");
const { users } = require("../models");
const { isAuthorized } = require("./tokenFunctions");
const bcrypt = require("bcrypt");
const boards = require("./boards");

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
          if (!bcrypt.compareSync(currentPassword, getUser.password)) {
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
      if (!userInfo) {
        return res.status(401).json({ message: "권한이 없습니다." });
      } else {
        const getUser = await users.findOne({
          where: { id: userInfo.id },
        });
        if (getUser) {
          await users.destroy({ where: { id: userInfo.id } });
          return res.status(200).json({ message: "삭제 완료" });
        }
      }
    } catch (err) {
      console.log(err);
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

  evaluateUser: async (req, res) => {
    // const userInfo = isAuthorized(req);
    // 인증된 사용자만 평가할 수 있습니다.

    const { name } = req.params;
    const { kind, time, again } = req.body;
    try {
      // boards 상태가 2(종료) 됐을 때 발생한다.
      const existUser = await users.findOne({
        attributes: ["kind", "time", "again"],
        where: { name },
      });
      if (existUser) {
        const reviewResult = await users.update(
          {
            kind: existUser.dataValues.kind + kind,
            time: existUser.dataValues.time + time,
            again: existUser.dataValues.again + again,
          },
          {
            where: { name },
          }
        );
        return res
          .status(200)
          .json({ data: reviewResult, message: "평가 완료" });
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },
};
