const router = require("express").Router();
const usersController = require("../controllers/users");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// 닉네임, 전화번호 변경
router.patch("/:id/changeInfo", usersController.changeInfo);
// 비밀번호 변경
router.patch("/:id/changePassword", usersController.changePassword);

router.delete("/:id", usersController.deleteUser);
router.get("/", usersController.getUser);
router.get("/:id/reviews", usersController.getReviews);
router.post("/:id/reviews", usersController.postReviews);

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
      //   const ext = path.extname(file.originalname); // 확장자 추출(.png)
      //   const basename = path.basename(file.originalname, ext); // 파일 이름
      done(null, req.body.name); // 파일이름+시간+확장자명
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post("/images", upload.single("file"), (req, res, next) => {
  console.log(req.files);
  // res.json({ url: `/uploads/${req.file.filename}` });
  res.json({ url: `/uploads/${req.file.filename}` });
  console.log(req.file.filename);
});

//  /uploads/gunslinger1651603947316.png
module.exports = router;
