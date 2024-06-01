import { NextApiResponse } from "next";
import { ServerOptions, Server as SocketIOServer } from "socket.io";

export type NextApiResponseSocket = NextApiResponse & {
  socket: {
    server: ServerOptions & { io?: SocketIOServer };
  };
};
