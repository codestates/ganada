const dotenv = require("dotenv");
dotenv.config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1d" });
  },

  sendAccessToken: (res, accessToken) => {
    return res
      .status(200)
      .cookie("jwt", accessToken)
      .json({ token: accessToken, message: "로그인 성공" });
  },

  removeAccessToken: (res) => {
    return res.status(200).clearCookie().json({ message: "로그아웃 성공" });
  },

  isAuthorized: (req) => {
    const Authorization = req.headers.authorization;
    if (!Authorization) {
      return null;
    }
    const token = Authorization.split(" ")[1];
    if (!token) {
      return null;
    }
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
};
