import { axiosInstance } from "../../utils/axios";

function createGame() {
  return axiosInstance.post("/game");
}

function getGame(id: string) {
  return axiosInstance.get(`/game/${id}`);
}

const GameAPI = { createGame, getGame };

export { GameAPI };
