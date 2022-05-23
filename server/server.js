const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const HTTP_PORT = 4000;
const db = require("./models/index");

const socketIO = require("socket.io");
const { isAuthorized } = require("./controllers/tokenFunctions");
const chatcontents = require("./models/chatcontents");
const io = socketIO(server, {
  cors: {
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log(`socket.io running on port ${HTTP_PORT}`);

  // 채팅방 참여
  socket.on("join", async (data) => {
    const { chatroomId } = data;
    socket.join(chatroomId);
  });

  // 채팅 시작을 누른 사람에게 기본적인 방에 대한 정보를 전달해준다.
  socket.on("sendBoardData", async (data) => {
    const { chatroomId, id, image, title, updatedAt } = data;
    const payload = {
      boardId: id,
      image,
      title,
      updatedAt,
    };
    io.to(chatroomId).emit("receiveBoardData", payload);
    const boardStringfy = JSON.stringify(payload);
    const chatting = await db.chatcontents
      .create({
        chatroomId,
        chats: `${boardStringfy}`,
      })
      .catch((err) => console.log(err));
  });

  socket.on("sendMessage", async (data) => {
    const { chats, userId, chatroomId, updatedAt, boardId } = data;
    await io.to(chatroomId).emit("receiveMessage", {
      boardId,
      userId,
      chats,
      chatroomId,
      updatedAt,
    });
    const chatContent = await db.chatcontents
      .create({
        userId,
        chatroomId: chatroomId,
        boardId,
        chats: chats,
      })
      .catch((err) => console.log(err));
  });

  socket.on("sendReservation", async (data) => {
    console.log("데이터", data);
    const { chatroomId, status, hostTitle, userTitle, reservationStatus } =
      data;
    await io.to(chatroomId).emit("receiveReservation", data);
  });
});

server.listen(HTTP_PORT, () => {
  console.log(`HTTP Server running on port ${HTTP_PORT}`);
});
