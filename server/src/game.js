import { Player } from "./player.js";

const GAME_CODE_LENGTH = 6;

function generateCodeGame() {
  let result = "";
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = charset.length;
  let counter = 0;
  while (counter < GAME_CODE_LENGTH) {
    result += charset.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

class GameManager {
  constructor() {
    this.games = new Map();
  }

  createGame() {
    const id = generateCodeGame();
    const game = new Game(id);
    this.games.set(id, game);
    return game;
  }

  getGame(id) {
    return this.games.get(id);
  }
}

/**
 * @type {GameManager}
 */
let globalGameManager;
function getGameManager() {
  if (globalGameManager === undefined) {
    globalGameManager = new GameManager();
  }

  return globalGameManager;
}

/**
 * Game represents room, which can has many
 * players and control signal to start.
 */
class Game {
  constructor(code) {
    this.code = code;
    this.players = new Map();
    this.owner = undefined;
  }

  /**
   * Add a player into a game player list.
   *
   * @param {Player} player
   */
  addPlayer(player) {
    this.players.set(player.getId(), player);
  }

  getCode() {
    return this.code;
  }

  getPlayers() {
    return this.players;
  }

  toObject() {
    return {
      id: this.code,
      players: Array.from(this.players.values()),
      owner: this.owner,
    };
  }

  /**
   * Sets the owner of the room.
   * @param {Player} owner the owner of the room.
   */
  setOwner(owner) {
    this.owner = owner;
  }

  /**
   * Retrieves the owner of the room.
   * @returns {Player} the owner of this game.
   */
  getOwner() {
    return this.owner;
  }
}

export { Game, GameManager, getGameManager };
