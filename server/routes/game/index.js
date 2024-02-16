import express from "express";
import { Game, getGameManager } from "../../src/game.js";

const GameRouter = express.Router();

GameRouter.post("/", (req, res) => {
  const createdGame = getGameManager().createGame();

  console.log(`Creating a new room with id ${createdGame.getCode()}`);
  res.json({ id: createdGame.code });
});

GameRouter.get("/:id", (req, res) => {
  const params = req.params;
  if (params.id === undefined) {
    res.json({ error: "Unable to find id" });
    return;
  }

  const { id } = params;
  /**
   * @type {Game}
   */
  const game = getGameManager().getGame(id);
  if (game === undefined) {
    res.status(404).json({ error: "Cannot found the game" });
    return;
  }

  res.json({ id: game.getCode(), players: game.players });
});

export default GameRouter;
