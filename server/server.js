// http server
const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const HTTP_PORT = 4000; // ec2 사용 시 80으로 변경하기

// socket.io server 구현하기
const socketIO = require("socket.io");
const io = socketIO(server, {
  cors: {
    origin: true,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

const { chatContent } = require("./models");
const { isAuthorized } = require("./controllers/tokenFunctions");

io.on("connection", (socket) => {
  console.log(`socket.io running on port ${HTTP_PORT}`);

  socket.on("ping", (msg) => {
    console.log(msg);
    socket.emit("pong", {
      msg: new Date().getTime(),
    });
  });

  // roomId: room 과 관련해서 client 와 협의하기
  socket.on("join", ({ roomId: room, userInfo }) => {
    socket.join(room);
    io.to(room).emit("onConnect", {
      hello: "hello",
      chats: `${userInfo.name} 님이 입장했습니다.`,
    });

    console.log(chats);

    socket.on("onSend", async (chats) => {
      io.to(room).emit("onReceive", {
        ...userInfo,
        Users: {
          name: userInfo.name,
          image: userInfo.image,
        },
        chats,
      });

      try {
        await chatContent.create({
          userId: userInfo.id,
          roomId: room,
          chats,
        });
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {
      socket.leave(room);
      io.to(room).emit("onDisconnect", {
        hello: "hello",
        chats: `${userInfo.name} 님과 채팅이 종료됐습니다.`,
      });
    });
  });
});

server.listen(HTTP_PORT, () => {
  console.log(`HTTP Server running on port ${HTTP_PORT}`);
});
