const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const https = require("https");
const path = require("path");

const authRouter = require("./routes/auth");
const boardsRouter = require("./routes/boards");
const usersRouter = require("./routes/users");
const reviewsRouter = require("./routes/reviews");
const chatRoomsRouter = require("./routes/chatRooms");
const chatContentsRouter = require("./routes/chatContents");

const httpServer = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use("/images", express.static(path.join(__dirname, "uploads")));

let port = 4000;

httpServer.listen(port, () => {
  console.log(`HTTP Server running on port ${port}`);
});
// AWS PORT 별도 설정 필요
