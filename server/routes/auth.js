const router = require("express").Router();
const authController = require("../controllers/auth");
const emailValidController = require("../controllers/mailVerification");

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/google", authController.google);
router.post("/kakao/callback", authController.kakao);
router.get("/naver", authController.naver);
router.post("/mailVerification", emailValidController.mailVerification);

// 유저 평가

module.exports = router;
