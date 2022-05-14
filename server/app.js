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

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://3gamestates.com",
      "https://3gamestates.com",
    ],
    credentials: true,
    methods: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("PROJECT GANADA");
});

const authRouter = require("./routes/auth");
const boardsRouter = require("./routes/boards");
const usersRouter = require("./routes/users");
const chatRoomsRouter = require("./routes/chatRooms");
const chatContentsRouter = require("./routes/chatContents");

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/boards", boardsRouter);
app.use("/chatRooms", chatRoomsRouter);
app.use("/chatcontents", chatContentsRouter);
app.use("/images", express.static(path.join(__dirname, "uploads")));

module.exports = app;
