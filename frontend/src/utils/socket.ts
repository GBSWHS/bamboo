import { Socket } from "socket.io-client";
import { getCookie } from "./cookies";

export default function emit(socket: Socket, event: string, messageBody?: any | undefined) {
  socket.emit(event, {
    ...messageBody,
    session: getCookie('session-id')
  })
}