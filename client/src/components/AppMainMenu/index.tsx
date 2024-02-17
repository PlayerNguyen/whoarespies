import {
  Box,
  Button,
  Divider,
  Group,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UsernameContext from "../../context/UsernameContext";
import useGame from "../../hooks/useGame";

export default function AppMainMenu() {
  const { username } = useContext(UsernameContext);
  const { createGame } = useGame();
  const navigate = useNavigate();

  const handleCreate = () => {
    createGame(username as string).then((response) => {
      const { id } = response.data;
      toast.success(`Đã tạo phòng mới`);

      navigate(`/game/${id}`);
    });
  };

  return (
    <>
      <div className="flex justify-center items-center min-w-[100vw] min-h-[100vh]">
        <Box
          miw={"60vw"}
          bg={"#f5f5f5"}
          px={"xl"}
          py={"md"}
          className="rounded-xl"
        >
          <Stack>
            {" "}
            <Title order={5}>Xin chào {username}</Title>
            <Stack>
              <Group align="end">
                <TextInput label="Mã trò chơi" placeholder="Mã gồm 6 chữ số" />
                <Button color={"primary"}>Vào trò chơi</Button>
              </Group>
              <Divider />
              <Button onClick={handleCreate} color={"primary"}>
                Tạo game mới
              </Button>
            </Stack>
          </Stack>
        </Box>
      </div>
    </>
  );
}
