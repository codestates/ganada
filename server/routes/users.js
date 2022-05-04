const router = require("express").Router();
const usersController = require("../controllers/users");

// 닉네임, 전화번호 변경
router.patch("/:id/changeInfo", usersController.changeInfo);
// 비밀번호 변경
router.patch("/:id/changePassword", usersController.changePassword);

router.delete("/:id", usersController.deleteUser);
router.get("/", usersController.getUser);

router.get("/:id/reviews", usersController.getReviews);
router.post("/:id/reviews", usersController.postReviews);

module.exports = router;
