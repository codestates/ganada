const router = require("express").Router();
const boardsController = require("../controllers/boards");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { boards } = require("../models");
const { isAuthorized } = require("../controllers/tokenFunctions");

router.get("/", boardsController.getAllPosts);
router.get("/:id", boardsController.getPosts);
router.get("/user/:id", boardsController.getMyPosts);
router.delete("/:id", boardsController.deletePosts);
router.put("/:id", boardsController.changeBoardStatus);

// chatRoom API
router.post("/:boardId/chatRooms", boardsController.createChat);

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
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // 파일 이름
      done(null, basename + new Date().getTime() + ext); // 파일이름+시간+확장자명
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

let fileNames = [];
router.post("/images", upload.array("file"), (req, res, next) => {
  req.files.forEach((v) => {
    fileNames.push(`${v.filename}`);
  });
  res.json(req.files.map((v) => v.filename));
});

router.post("/", async (req, res, next) => {
  const userInfo = isAuthorized(req);
  if (userInfo) {
    try {
      const {
        category,
        title,
        description,
        tags,
        latitude,
        longitude,
        mainAddress,
        detailAddress,
        image,
      } = req.body;
      console.log(image);
      const createBoards = await boards.create({
        category,
        title,
        description,
        tags,
        latitude,
        longitude,
        mainAddress,
        detailAddress,
        image: `${fileNames}`,
        userId: userInfo.id,
      });
      fileNames = []; // 지우면 안돼요..
      return res.status(200).json({ data: createBoards, message: "작성 완료" });
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  } else {
    return res.status(401).json({ message: "권한 없음" });
  }
});

router.patch("/:id", async (req, res) => {
  const userInfo = isAuthorized(req);
  if (userInfo) {
    try {
      const { id } = req.params;
      const searchPost = await boards.findOne({
        where: { id },
      });
      if (searchPost) {
        const {
          title,
          description,
          tags,
          latitude,
          longitude,
          mainAddress,
          detailAddress,
          status,
        } = req.body;
        if (userInfo.id === searchPost.dataValues.userId) {
          await boards.update(
            {
              title,
              description,
              tags,
              latitude,
              longitude,
              mainAddress,
              detailAddress,
              status,
              image: `${fileNames}`,
              userId: userInfo.id,
            },
            {
              where: { id },
            }
          );
          fileNames = [];
          return res
            .status(200)
            .json({ data: searchPost, message: "수정 완료" });
        }
      } else {
        return res.status(400).json({ message: "권한이 없습니다." });
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  }
}),
  (module.exports = router);
