import { Socket } from 'socket.io';
import { UserMessageType } from '../messages/incoming-messages';

const handleSendMessage = (socket: Socket, payload: UserMessageType): void => {
  const { message, roomId, userId } = payload;
  socket.send(`Message: ${message} by ${userId} on ${roomId}`);
};

export { handleSendMessage };
