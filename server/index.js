import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import GameRouter from "./routes/game/index.js";
import { Game, getGameManager } from "./src/game.js";
import { Player } from "./src/player.js";

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

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
  socket.on("join", (params, callback) => {
    if (params.username === undefined || params.room === undefined) {
      throw new Error(`Invalid room or username`);
    }
    const { username, room } = params;
    /**
     * @type {Game}
     */
    const game = getGameManager().getGame(room);
    // If game cannot be found
    if (!game) {
      return callback({
        status: "error",
        message: "Cannot found the game",
      });
    }

    const player = new Player(undefined, username);
    game.addPlayer(player);

    // Add to room socket
    socket.join(game.getCode());

    // Broadcast to all players
    io.to(game.getCode()).emit("player-join", player, game.toObject());

    // Return as a callback
    return callback({
      status: "ok",
      message: "Successfully joined into the game",
      data: {
        game: game.toObject(),
      },
    });
  });

  socket.on("player-ready", (params, callback) => {});
  socket.on("player-unready", (params, callback) => {});
});

httpServer.listen(3000);
console.log(`http://localhost:3000`);
