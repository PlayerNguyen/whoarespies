import { useEffect } from "react";
import { socket } from "../utils/socket";

export default function usePassiveHandleEvent(
  eventName: string,
  listener: (...args: any[]) => void
) {
  useEffect(() => {
    socket.on(eventName, listener);

    return () => {
      socket.off(eventName, listener);
    };
  }, []);
}
