type SocketResponse<T = undefined> = {
  status: "ok" | "error";
  message: string;
  data: T;
};

type Player = { id: string; name: string };

type Game = {
  id: string;
  players: Player[];
};

type PlayerJoinCallback = (player: Player, game: Game) => void;
