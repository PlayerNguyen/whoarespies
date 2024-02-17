type ChatType = "announcement" | "message";

type Chat = {
  date: Date;
  message: string;
  type: ChatType;
};
