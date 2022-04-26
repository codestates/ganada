module.exports = {
  signUp: async (req, res) => {
    return res.status(200).json({ message: "ok" });
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
