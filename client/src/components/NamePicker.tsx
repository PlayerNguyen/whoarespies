import {
  Box,
  Button,
  Checkbox,
  Flex,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useContext } from "react";
import toast from "react-hot-toast";
import z from "zod";
import UsernameContext from "../context/UsernameContext";
import useUsername from "../hooks/useUsername";

type NamePickerFormType = {
  name: string;
  saved: boolean;
};

const NamePickerValidateSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Chiều dài tên không thể nhỏ hơn 4 ký tự" })
    .max(32, { message: "Chiều dài tên không thể lớn hơn 32 ký tư" }),
});

export default function NamePicker() {
  const { setUsername: setPermanentlyUsername, setTemporaryUsername } =
    useUsername();
  const { setUsername } = useContext(UsernameContext);

  const form = useForm<NamePickerFormType>({
    initialValues: { name: "", saved: false },
    validate: zodResolver(NamePickerValidateSchema),
  });

  const handleSubmit = ({ name, saved }: NamePickerFormType) => {
    saved ? setPermanentlyUsername(name) : setTemporaryUsername(name);
    setUsername && setUsername(name);
    toast.success(`Đã thiết lập tên thành công`);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Box
        bg={"#f5f5f5"}
        p={"md"}
        px={"lg"}
        maw={{ md: "40vw" }}
        miw={{ md: "40vw" }}
        className="rounded-xl"
      >
        <Stack gap={12}>
          <Title order={4}>Bạn là ai vậy?</Title>
          <Text>
            Hãy chọn một tên để mọi người có thể phân biệt so với người khác.
          </Text>
          <TextInput
            name="name"
            placeholder="tên này sẽ hiển thị trong trò chơi"
            label="Tên người chơi"
            {...form.getInputProps("name")}
          />
          <Checkbox
            label="Lưu tên đăng nhập"
            color="primary"
            {...form.getInputProps("saved", { type: "checkbox" })}
          />
          <Flex justify={"end"}>
            <Button variant="filled" color="primary" type="submit">
              Tiếp tục
            </Button>
          </Flex>
        </Stack>
      </Box>
    </form>
  );
}
