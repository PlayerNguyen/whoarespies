import { Box, Button, CopyButton, Stack, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { GameAPI } from "../../api/game";
import ChatsContext from "../../context/ChatsContext";
import UsernameContext from "../../context/UsernameContext";
import useChat from "../../hooks/useChat";
import usePassiveHandleEvent from "../../hooks/usePassiveHandleEvent";
import { socket } from "../../utils/socket";

export default function AppGame() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { username } = useContext(UsernameContext);
  const [players, setPlayers] = useState<Player[]>([]);
  const { chats } = useContext(ChatsContext);
  const { addChat } = useChat();

  if (id === undefined)
    return (
      <>
        <Text c={"white"}>Không tìm thấy trò chơi này</Text>
      </>
    );

  const { data, isSuccess, isFetching } = useQuery({
    queryKey: ["get-game-manager", id],
    queryFn: async () => await GameAPI.getGame(id),
  });

  if (!isFetching && !isSuccess) {
    return (
      <>
        <div className="flex justify-center items-center min-h-[100vh] min-w-[100vw]">
          <Box
            bg={"#f5f5f5"}
            miw={"80vw"}
            px={"lg"}
            py={"md"}
            className="rounded-xl"
          >
            <Stack>
              <Text>Đã có lỗi xảy ra, hãy thử lại.</Text>
              <Button
                onClick={() => {
                  navigate("/");
                }}
                color="primary"
              >
                Trở về trang chủ
              </Button>
            </Stack>
          </Box>
        </div>
      </>
    );
  }

  useEffect(() => {
    function onConnect() {
      console.log(`Successfully hand-shaking to the game server ${Date.now()}`);
    }

    socket.on("connect", onConnect);
    socket.emit(
      "join",
      { username, room: id },
      (response: SocketResponse<{ game: Game }>) => {
        // Refresh a player list
        setPlayers(
          response.data.game.players.map((player) => ({
            name: player.name,
            id: player.id,
          }))
        );
      }
    );

    return () => {
      socket.off("connect", onConnect);
    };
  }, []);

  /**
   * Handle player joining
   */
  const onPlayerJoin: PlayerJoinCallback = (_player, game) => {
    // Re-render players list
    setPlayers(game.players);
    toast(`Người chơi ${_player.name} đã tham gia.`);
    addChat(`Người chơi ${_player.name} đã tham gia vào trò chơi.`);
  };
  usePassiveHandleEvent("player-join", onPlayerJoin);

  return (
    data && (
      <div className="flex flex-col justify-center items-center min-h-[100vh] min-w-[100vw] gap-1">
        <Box
          bg={"#f5f5f5"}
          miw={"80vw"}
          px={"lg"}
          py={"md"}
          className="rounded-xl"
        >
          <Stack gap={2}>
            <Title order={3}>
              Trò chơi{" "}
              <CopyButton value={id}>
                {({ copy, copied }) => {
                  return (
                    <>
                      <Button
                        variant="filled"
                        size="compact-sm"
                        color="primary"
                        onClick={copy}
                      >
                        {copied ? <>Đã sao chép</> : <>#{id}</>}
                      </Button>
                    </>
                  );
                }}
              </CopyButton>
            </Title>
            <Text>
              Tên người chơi <b>{username}</b>
            </Text>
          </Stack>
        </Box>
        <Box
          bg={"#f5f5f5"}
          miw={"80vw"}
          px={"lg"}
          py={"md"}
          mih={"80vh"}
          mah={"80vh"}
          className="rounded-xl flex gap-2"
        >
          <Box
            bg={"#fcfcfc"}
            px={"lg"}
            py={"md"}
            className="rounded-xl overflow-auto w-1/3"
          >
            {/* <Text>Player 1</Text>
            <Text>Player 1</Text>
            <Text>Player 1</Text>
            <Text>Player 1</Text>
            <Text>Player 1</Text> */}
            {players.map((player) => {
              return <Text key={player.id}>{player.name}</Text>;
            })}
          </Box>
          <Box bg={"#fcfcfc"} px={"lg"} py={"md"} className="rounded-xl w-full">
            <Title>Chat</Title>

            {chats &&
              chats.map((chat) => {
                if (chat.type === "announcement") {
                  return (
                    <Text key={chat.date.toTimeString()} c={"#c3c3c3"}>
                      {dayjs(chat.date).format("HH:mm:ss")}{" "}
                      <b>{chat.message}</b>
                    </Text>
                  );
                }

                return (
                  <Text key={chat.date.toTimeString()}>
                    {chat.date.toDateString()} {chat.message}
                  </Text>
                );
              })}
            {/* <Text>Test</Text>
              <Text>Test</Text>
              <Text>Test</Text>
              <Text>Test</Text>
              <Text>Test</Text> */}
          </Box>
        </Box>
      </div>
    )
  );
}
