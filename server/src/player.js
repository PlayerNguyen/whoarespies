import { v4 as uuid } from "uuid";

/**
 * Represent a player, which will create when the socket is connected.
 */
class Player {
  constructor(id, name) {
    this.id = id !== undefined ? id : uuid();
    this.name = name;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }
}

class PlayerManager {
  constructor() {
    this.players = new Map();
  }

  createPlayer(ipAddr, username) {
    const p = new Player(undefined, username);
    this.players.set(ipAddr);
    return p;
  }

  removePlayer(ipAddr) {
    this.players.delete(ipAddr);
  }
}

export { Player, PlayerManager };
