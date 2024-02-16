import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import GameRouter from "./routes/game/index.js";

const app = express();

app.use(express.static("public"));
app.use(cors());

app.use("/game", GameRouter);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  // User start open socket

  /**
   *
   */
  socket.on("join", (params) => {
    if (params.username === undefined || params.room === undefined) {
      throw new Error(`Invalid room or username`);
    }
    const { username, room } = params;
    console.log(`Joining ${username} into room ${room}`);
  });
});

httpServer.listen(3000);
console.log(`http://localhost:3000`);
