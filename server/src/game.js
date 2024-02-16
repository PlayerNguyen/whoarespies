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
  }

  addPlayer() {
    throw new Error("Not implemented");
  }

  getCode() {
    return this.code;
  }
}

export { Game, GameManager, getGameManager };
