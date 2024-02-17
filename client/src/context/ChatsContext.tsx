import React, { Dispatch, SetStateAction } from "react";

const ChatsContext = React.createContext<{
  setChats: Dispatch<SetStateAction<Chat[]>> | undefined;
  chats: Chat[] | undefined;
}>({
  chats: undefined,
  setChats: undefined,
});

export default ChatsContext;
