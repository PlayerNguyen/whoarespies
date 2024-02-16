import React, { Dispatch, SetStateAction } from "react";

const UsernameContext = React.createContext<{
  username: string | undefined;
  setUsername: undefined | Dispatch<SetStateAction<string | undefined>>;
}>({
  username: undefined,
  setUsername: undefined,
});

export default UsernameContext;
