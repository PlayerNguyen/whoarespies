import { useContext } from "react";
import ChatsContext from "../context/ChatsContext";

export default function useChat() {
  const { setChats } = useContext(ChatsContext);

  function addChat(message: string, type?: ChatType) {
    if (setChats === undefined) {
      throw new Error(`setChats function cannot be undefined`);
    }
    console.log(`Chatting with message ${message}`);

    setChats((chats: Chat[]) => {
      return [
        ...chats,
        {
          date: new Date(Date.now()),
          message,
          type: type === undefined ? "announcement" : type,
        },
      ];
    });
  }

  return { addChat };
}
