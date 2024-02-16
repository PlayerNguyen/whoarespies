import { Box, Button, Stack, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameAPI } from "../../api/game";
import UsernameContext from "../../context/UsernameContext";
import { socket } from "../../utils/socket";

export default function AppGame() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { username } = useContext(UsernameContext);

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
    socket.on("connect", () => {
      console.log(`Successfully handshake to the game server ${Date.now()}`);
    });

    socket.emit("join", { username, room: id });

    return () => {
      socket.removeListener("connect");
    };
  }, []);

  return (
    data && (
      <div className="flex justify-center items-center min-h-[100vh] min-w-[100vw]">
        <Box
          bg={"#f5f5f5"}
          miw={"80vw"}
          px={"lg"}
          py={"md"}
          className="rounded-xl"
        >
          <Stack>
            <Title order={3}>Trò chơi</Title>
          </Stack>
        </Box>
      </div>
    )
  );
}
