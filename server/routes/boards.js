const router = require("express").Router();
const boardsController = require("../controllers/boards");

// router.get("/", boardsController.getAllPosts);
// router.get("/:id", boardsController.getPosts);
// router.post("/", boardsController.posts);
// router.patch("/:id", boardsController.patchPosts);
// router.delete("/:id", boardsController.deletePosts);

// Reservations API
router.post("/:id/reservations", boardsController.postReservations);
router.patch("/:id/reservations", boardsController.finishReservations);
router.delete("/:boardId/reservations", boardsController.deleteReservations);

module.exports = router;
