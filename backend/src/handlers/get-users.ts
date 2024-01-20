import { Server, Socket } from 'socket.io';
import { GetUsersType } from '../messages/incoming-messages';

const handleOnlineUsers = (
  io: Server,
  socket: Socket,
  payload: GetUsersType,
): void => {
  console.log(io.sockets.sockets.size);
};
export { handleOnlineUsers };
