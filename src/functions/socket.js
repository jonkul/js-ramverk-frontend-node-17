// Create a dedicated file for socket connection.
// You can import this socket instance in other React components whenever necessary
// In this way, you can ensure there will be only one socket instance

import io from "socket.io-client";
// import { SOCKET_URL } from "config";

const SOCKET_URL = "http://localhost:1337";

export const socket = io(SOCKET_URL);
