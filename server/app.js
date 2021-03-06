const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const https = require("https");
const path = require("path");
const db = require("./models");

// DB Connection

db.sequelize
  .sync()
  .then(() => {
    console.log("Connect DB Completed");
  })
  .catch(console.error);

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
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
