import { NextApiResponseSocket } from '@/server/lib/socket/types';
import { NextApiRequest } from 'next';
import { Server } from 'socket.io';

const handler = async (req: NextApiRequest, res: NextApiResponseSocket) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    console.log('socket.io server started');
  } else {
    console.log('socket.io already running');
  }
  res.end();
};
export default handler;
