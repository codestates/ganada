const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const HTTP_PORT = 80;
const db = require("./models/index");

const socketIO = require("socket.io");
const io = socketIO(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://3gamestates.com",
      "https://3gamestates.com",
    ],
    credentials: true,
    methods: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`socket.io running on port ${HTTP_PORT}`);

  socket.on("join", async (data) => {
    const { chatroomId } = data;
    socket.join(chatroomId);
  });

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
    const { chats, userId, chatroomId, updatedAt } = data;
    await io.to(chatroomId).emit("receiveMessage", {
      userId,
      chats,
      chatroomId,
      updatedAt,
    });
    const chatContent = await db.chatcontents
      .create({
        userId,
        chatroomId: chatroomId,
        chats: chats,
      })
      .catch((err) => console.log(err));
  });
});

server.listen(HTTP_PORT, () => {
  console.log(`HTTP Server running on port ${HTTP_PORT}`);
});
