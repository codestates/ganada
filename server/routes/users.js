const router = require("express").Router();
const usersController = require("../controllers/users");

router.patch("/:id", usersController.modifyUser);
router.delete("/:id", usersController.deleteUser);
router.get("/", usersController.getUser);

router.get("/:id/reviews", usersController.getReviews);
router.post("/:id/reviews", usersController.postReviews);

module.exports = router;
