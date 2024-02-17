import { useMutation } from "@tanstack/react-query";
import { GameAPI } from "../api/game";

export default function useGame() {
  const { mutateAsync: createGame } = useMutation({
    mutationFn: async (author: string) => await GameAPI.createGame(author),
    mutationKey: ["post-game-create-game"],
  });

  return { createGame };
}
