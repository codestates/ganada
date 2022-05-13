const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const https = require("https");
const path = require("path");
const db = require("./models");
const hpp = require("hpp");
const helmet = require("helmet");

// DB Connection
// 배포 모드
if (process.env.NODE_ENV === "production") {
  console.log("배포 모드");
  app.use(hpp());
  app.use(helmet());
} else {
  console.log("개발 모드");
}

db.sequelize
  .sync()
  .then(() => {
    console.log("Connect DB Completed");
  })
  .catch(console.error);

// app setting
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://3gamestates.com",
      // "http://www.ganada.com",
      // "https://www.ganada.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("PROJECT GANADA");
});

// Router Collection

const authRouter = require("./routes/auth");
const boardsRouter = require("./routes/boards");
const usersRouter = require("./routes/users");
const chatRoomsRouter = require("./routes/chatRooms");
const chatContentsRouter = require("./routes/chatContents");

// express use Routers

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/boards", boardsRouter);
app.use("/chatRooms", chatRoomsRouter);
app.use("/chatcontents", chatContentsRouter);
app.use("/images", express.static(path.join(__dirname, "uploads")));

// Image AWS PORT 별도 설정 필요

module.exports = app;
