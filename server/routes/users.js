const router = require("express").Router();
const usersController = require("../controllers/users");

router.patch("/:id", usersController.modifyUser);
router.delete("/:id", usersController.deleteUser);
router.get("/:id", usersController.getUser);

module.exports = router;
