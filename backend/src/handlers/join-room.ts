import { Socket } from 'socket.io';
import { InitMessageType } from '../messages/incoming-messages';

const handleJoinRoom = (socket: Socket, payload: InitMessageType): void => {
  const { name, roomId, userId } = payload;
  socket.send(`Name: ${name} by ${userId} on ${roomId}`);
};

export { handleJoinRoom };
