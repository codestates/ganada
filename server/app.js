const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const https = require("https");

const authRouter = require("./routes/auth");
const boardsRouter = require("./routes/boards");
const usersRouter = require("./routes/users");
const reviewsRouter = require("./routes/reviews");
const chatRoomsRouter = require("./routes/chatRooms");
const chatContentsRouter = require("./routes/chatContents");

const httpServer = http.createServer(app);
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      // "http://www.ganada.com",
      // "https://www.ganada.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.get("/", function (req, res) {
  res.send("Hello World");
});
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/boards", boardsRouter);
app.use("/reviews", reviewsRouter);
app.use("/chatrooms", chatRoomsRouter);
app.use("/chatcontents", chatContentsRouter);

app.listen(3000, () => console.log("3000번 포트 대기"));

httpServer.listen(4000, () => {
  console.log(`HTTP Server running on port 4000`);
});
