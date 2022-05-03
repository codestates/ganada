const router = require("express").Router();
const authController = require("../controllers/auth");
const emailValidController = require("../controllers/mailVerification");

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/google", authController.google);
router.get("/kakao", authController.kakao);
router.get("/naver", authController.naver);
router.post("/mailVerification", emailValidController.mailVerification);

module.exports = router;
