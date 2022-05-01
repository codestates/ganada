const jwt = require("jsonwebtoken");
const axios = require("axios");
const bcrypt = require("bcrypt");
const { Users } = require("../models");
const dotenv = require("dotenv");
dotenv.config();
const random = require("./mailVerification");
const {
  generateAccessToken,
  sendAccessToken,
  removeAccessToken,
  isAuthorized,
} = require("../controllers/tokenFunctions");

module.exports = {
  signUp: async (req, res) => {
    const { email, emailValidate, password, rePassword, phoneNumber, name } =
      req.body;

    if (
      !email ||
      !emailValidate ||
      !password ||
      !rePassword ||
      !phoneNumber ||
      !name
    ) {
      return res.json({ message: "필수 항목을 입력하세요." });
    }
    try {
      const userEmail = await Users.findOne({ where: { email } });
      const userNickname = await Users.findOne({ where: { name } });
      const hashed = await bcrypt.hash(password, 10);

      if (Number(emailValidate) !== random.number) {
        return res.json({ message: "잘못된 정보입니다." });
      }

      if (userEmail) {
        return res.json({ message: "중복된 이메일입니다." });
      } else if (userNickname) {
        return res.json({ message: "중복된 닉네임입니다." });
      } else {
        await Users.create({
          email,
          name,
          phoneNumber,
          password: hashed,
        });
        return res.status(201).json({ message: "회원가입 성공" });
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await Users.findOne({ where: { email } });
      if (!user || !bcrypt.compareSync(password, user.dataValues.password)) {
        return res.json({ message: "잘못된 정보를 입력" });
      } else {
        delete user.dataValues.password;
        const accessToken = generateAccessToken(user.dataValues);
        sendAccessToken(res, accessToken);
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  logout: async (req, res) => {
    const userInfo = isAuthorized(req);

    try {
      if (userInfo) {
        removeAccessToken(res);
      } else {
        return res.json({ message: "이미 로그아웃 된 상태입니다." });
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  google: async (req, res) => {
    return res.status(200).json({ message: "ok" });
  },

  kakao: async (req, res) => {
    return res.status(200).json({ message: "ok" });
  },

  naver: async (req, res) => {
    return res.status(200).json({ message: "ok" });
  },

  // 코드가 너무 길어질 경우, OAuth2.0
  // 또는 mailVerification에 대한 분리가 필요하다고 생각합니다.
  // -----------------------------------------------
  // mailVerification 파일 하나 만들어서 올리겠습니다.
};
