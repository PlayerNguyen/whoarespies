import { axiosInstance } from "../../utils/axios";

function createGame(author: string) {
  return axiosInstance.post("/game", { owner: author });
}

function getGame(id: string) {
  return axiosInstance.get(`/game/${id}`);
}

const GameAPI = { createGame, getGame };

export { GameAPI };
