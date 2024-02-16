import { useMutation } from "@tanstack/react-query";
import { GameAPI } from "../api/game";

export default function useGame() {
  const { mutateAsync: createGame } = useMutation({
    mutationFn: async () => await GameAPI.createGame(),
    mutationKey: ["post-game-create-game"],
  });

  return { createGame };
}
