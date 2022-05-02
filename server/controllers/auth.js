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
    const { code, state } = req.body;
    if (code && state) {
      const response = await fetch(
        `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&code=${code}&state=${state}`
      ).then((res) => res.json());
      const naverAccessToken = response.access_token;
      const naverUserInfo = await fetch(`https://openapi.naver.com/v1/nid/me`, {
        headers: {
          Authorization: `Bearer ${naverAccessToken}`,
        },
      }).then((res) => res.json());

      // Save DATABASE
      const email = naverUserInfo.response.email + "-Naver";
      const name =
        naverUserInfo.response.nickname + String(Math.random()).slice(2, 8);
      // const password = process.env.SOCIAL_LOGIN_PASSWORD;
      const image = naverUserInfo.response.profile_image;

      let userInfo = await Users.findOne({ email });
      if (!userInfo) {
        userInfo = await Users.create({ email, name, password, image });
      }
      const accessToken = generateToken(userInfo, "accessToken"); //도형님이 만든 토큰명으로 변경하기
      const refreshToken = generateToken(userInfo, "refreshToken");
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/users/auth/token",
        maxAge: 60 * 60 * 24 * 7,
      });
      res.json({
        _id: userInfo._id,
        accessToken,
        message: "네이버 로그인",
      });
    } else {
      res.status(500).json({ message: "서버 에러" });
    }
  },

  // 코드가 너무 길어질 경우, OAuth2.0
  // 또는 mailVerification에 대한 분리가 필요하다고 생각합니다.
  mailVerification: async (req, res) => {
    return res.status(200).json({ message: "ok" });
  },
};
