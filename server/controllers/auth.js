const { Users } = require("../models");

module.exports = {
  signUp: async (req, res) => {
    const { email, name, password, phoneNumber } = req.body;
    // 필수 항목 입력 만들기
    try {
      const createUser = await Users.create({
        email,
        name,
        password,
        phoneNumber,
      });
      if (createUser) {
        return res.status(201).json({ message: "success" });
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  login: async (req, res) => {
    return res.status(200).json({ message: "ok" });
  },

  logout: async (req, res) => {
    return res.status(200).json({ message: "ok" });
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
  mailVerification: async (req, res) => {
    return res.status(200).json({ message: "ok" });
  },
};
