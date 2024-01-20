import { Socket } from 'socket.io';
import { ActiveUsers } from '../manager/active-users';

const listActiveUsers = (socket: Socket): void => {
  const activeUsers = ActiveUsers.getInstance();

  console.log(activeUsers.listUsers());

  socket.broadcast.emit('message', activeUsers.listUsers());
};
export { listActiveUsers };
