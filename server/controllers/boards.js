const { boards, reservations } = require("../models");
const { isAuthorized } = require("./tokenFunctions");

module.exports = {
  // 모델 리스트  = 0
  // 사진작가 리스트 = 1
  getAllPosts: async (req, res) => {
    try {
      const { category, tags } = req.query; // ["순수, 청순"]
      const arrTags = tags.split(","); // ["순수", "청순"]
      // const filtered = arrTags.filter((tag) => {});
      // const toStr = filtered.join(",");
      // 모델 리스트 조회
      if (category === "0") {
        // 모델 리스트에서 이러한 태그를 선택한 리스트 조회
        // ["순수, 청순"]
        const modelPosts = await boards.findAll({
          where: { category }, // ["순수,청순,귀염"]
        });
        return res.status(200).json({ data: modelPosts, message: "조회 성공" });
      } else {
        // 사진작가 리스트 조회
        const photoPosts = await boards.findAll({
          where: { category },
        });
        return res.status(200).json({ data: photoPosts, message: "조회 성공" });
      }
      // users에서 user 정보 가져와야 한다.
      //데이터가 없는 경우 데이터 없음을 표시해야 한다.
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  getPosts: async (req, res) => {
    try {
      const { id } = req.params;
      const searchPost = await boards.findOne({
        where: { id },
        // 유저 정보, 유저 평점 조회하기
      });
      return res.status(200).json({ data: searchPost, message: "조회 성공" });
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  // posts: async (req, res) => {
  //   // const userInfo = isAuthorized(req);
  //   const userInfo = 1;
  //   try {
  //     if (userInfo) {
  //       const {
  //         category,
  //         title,
  //         image,
  //         description,
  //         tags,
  //         latitude,
  //         longitude,
  //         mainAddress,
  //         detailAddress,
  //       } = req.body;
  //       const createPost = await boards.create({
  //         category,
  //         title,
  //         image,
  //         description,
  //         tags,
  //         latitude,
  //         longitude,
  //         mainAddress,
  //         detailAddress,
  //         userId: userInfo.id,
  //       });
  //       if (createPost) {
  //         console.log(req.body);
  //         return res
  //           .status(200)
  //           .json({ data: createPost, message: "작성 완료" });
  //       }
  //     } else {
  //       res.status(401).json({ message: "권한이 없습니다." });
  //     }
  //   } catch (err) {
  //     return res.status(500).json({ message: "서버 에러" });
  //   }
  // },

  patchPosts: async (req, res) => {
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
            image,
            description,
            tags,
            sex,
            age,
            height,
            weight,
            latitude,
            longitude,
            mainAddress,
            detailAddress,
          } = req.body;
          if (userInfo.id === searchPost.dataValues.userId) {
            await boards.update(
              {
                title,
                image,
                description,
                tags,
                sex,
                age,
                height,
                weight,
                latitude,
                longitude,
                mainAddress,
                detailAddress,
              },
              {
                where: { id },
              }
            );
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
  },

  deletePosts: async (req, res) => {
    const userInfo = isAuthorized(req);

    if (userInfo) {
      try {
        const { id } = req.params;
        const searchPost = await boards.findOne({
          where: { id },
        });
        if (searchPost) {
          if (userInfo.id === searchPost.dataValues.userId) {
            await boards.destroy({ where: { id } });
            res.status(200).json({ message: "삭제 완료" });
          } else {
            return res.status(400).json({ message: "권한이 없습니다." });
          }
        }
      } catch (err) {
        return res.status(500).json({ message: "서버 에러" });
      }
    }
  },

  postReservations: async (req, res) => {
    try {
      const { status, boardId } = req.body;
      const createReservations = await reservations.create({
        status,
        boardId,
      });
      if (createReservations) {
        return res.status(200).json({ createReservations });
      }
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  finishReservations: async (req, res) => {
    try {
      const { boardId } = req.body;
      const existReservations = await reservations.findOne({
        where: { boardId },
      });
      if (existReservations) {
        const { status } = req.body;
        await reservations.update(
          {
            status,
          },
          {
            where: { boardId },
          }
        );
      }
      return res.status(200).json({ message: "업데이트 완료" });
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },

  deleteReservations: async (req, res) => {
    try {
      const { boardId } = req.body;
      const existReservations = await reservations.findOne({
        where: { boardId },
      });
      if (existReservations) {
        await reservations.destroy({
          where: { boardId },
        });
      }
      return res.status(200).json({ message: "삭제 완료" });
    } catch (err) {
      return res.status(500).json({ message: "서버 에러" });
    }
  },
};
