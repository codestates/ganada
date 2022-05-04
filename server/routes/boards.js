const router = require("express").Router();
const boardsController = require("../controllers/boards");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { boards, Users } = require("../models");

router.get("/", boardsController.getAllPosts);
router.get("/:id", boardsController.getPosts);
// router.post("/", boardsController.posts);
router.patch("/:id", boardsController.patchPosts);
router.delete("/:id", boardsController.deletePosts);

// Reservations API
router.post("/:id/reservations", boardsController.postReservations);
router.patch("/:id/reservations", boardsController.finishReservations);
router.delete("/:boardId/reservations", boardsController.deleteReservations);

// 이미지 업로드용 라우터
try {
  // 폴더 저장 경로가 존재하지 않는 경우 폴더 만들어주기
  console.log("uploads 폴더가 존재합니다.");
  fs.accessSync("uploads");
} catch (err) {
  console.log("uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    // 나중에는 반드시 S3로 대체해야한다. 재배포마다 용량 잡아먹어서 문제된다.
    destination(req, file, done) {
      console.log("여기서 에러");
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // 파일 이름
      done(null, basename + new Date().getTime() + ext); // 파일이름+시간+확장자명
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

router.post("/", upload.none(), async (req, res, next) => {
  try {
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map((image) => boards.create({ image: image }))
        );
        await boards.addImages(images);
      } else {
        const image = await boards.create({ image: req.body.image });
        await boards.addImages(image);
      }
    }
    const fullPost = await boards.findOne({
      where: { id: boards.id },
      include: [
        {
          model: Users,
          attributes: ["id", "name"],
        },
      ],
    });
    return res.status(200).json({ data: fullPost, message: "작성 완료" });
  } catch (err) {
    return res.status(500).json({ message: "서버 에러" });
  }
});

//  /uploads/gunslinger1651603947316.png
router.post("/image", upload.array("image"), async (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map((data) => data.filename));
});

module.exports = router;
