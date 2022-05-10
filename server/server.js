// http server
const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const HTTP_PORT = 4000; // ec2 사용 시 80으로 변경하기
const { chatrooms, chatcontent } = require("../server/models");
const db = require("./models/index");

// socket.io server 구현하기
const socketIO = require("socket.io");
const io = socketIO(server, {
  cors: {
    origin: true,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

const { isAuthorized } = require("./controllers/tokenFunctions");
const boards = require("./models/boards");

io.on("connection", (socket) => {
  console.log(`socket.io running on port ${HTTP_PORT}`);

  // 채팅방 참여 로직 필요
  socket.on("join", async (data, req, res) => {
    const { chatroomId } = data;
    socket.join(chatroomId);
    try {
      // 채팅방이 생성 될 때 유정님한테 필요한 자료는?
      // user("이미지", "닉네임", "아이디")
      // board("아이디", "타이틀", "이미지")
      const { id, userId, boardId } = data;
      await db.chatrooms.create({
        id,
        userId,
        boardId,
      });
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("onSend", async (data, req, res) => {
    const { chats, userId, chatroomId, boardId } = data;
    io.to(chatroomId).emit("onReceive", {
      chats,
      userId,
      chatroomId,
    });
    try {
      const createChat = await db.chatcontents.create({
        chats,
        userId,
        chatroomId,
      });
      if (createChat) {
        await db.user_chatroom.create({
          // 게시글 작성자 아이디를 가져와보자
          userId,
          chatroomId,
          boardId,
        });
      }
    } catch (err) {
      console.log(err);
    }
  });

  // 상대방 과 내가 한 방에 있어야하는 테이블이 필요하다. (board까지 가지고 올 수 있는..)

  // 채팅방 삭제 로직 필요
  socket.on("leave", async (data) => {
    const { id } = data;
    socket.leave(id);
    try {
      await db.chatrooms.destroy({
        where: { id },
      });
    } catch (err) {
      console.log(err);
    }
  });
});

server.listen(HTTP_PORT, () => {
  console.log(`HTTP Server running on port ${HTTP_PORT}`);
});
