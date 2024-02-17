import {
  MantineColorsTuple,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppGame from "./components/AppGame";
import AppMainMenu from "./components/AppMainMenu";
import NamePicker from "./components/NamePicker";
import ChatsContext from "./context/ChatsContext";
import UsernameContext from "./context/UsernameContext";
import useUsername from "./hooks/useUsername";
import "./index.css";

const primary: MantineColorsTuple = [
  "#f2f0ff",
  "#e0dff2",
  "#bfbdde",
  "#9b98ca",
  "#7d79ba",
  "#6a65b0",
  "#605bac",
  "#504c97",
  "#464388",
  "#3b3979",
];
const theme = createTheme({
  /** Put your mantine theme override here */
  colors: {
    primary,
  },
});

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    index: true,
    element: <AppMainMenu />,
  },
  {
    path: "/game/:id",
    element: <AppGame />,
  },
]);

export default function App() {
  const { getStoredUsername } = useUsername();
  const [username, setUsername] = useState<string | undefined>(
    getStoredUsername()
  );
  const [chats, setChats] = useState<Chat[]>([]);
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <UsernameContext.Provider value={{ setUsername, username }}>
          <ChatsContext.Provider value={{ chats, setChats }}>
            {username === undefined ? (
              <div className="min-h-[100vh] min-w-[100vw] flex justify-center items-center">
                <NamePicker />
              </div>
            ) : (
              <RouterProvider router={router} />
            )}
          </ChatsContext.Provider>
        </UsernameContext.Provider>
        <Toaster position="bottom-center" reverseOrder={false} />
      </MantineProvider>
    </QueryClientProvider>
  );
}
