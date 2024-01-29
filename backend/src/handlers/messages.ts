import { Socket } from 'socket.io';
import { UserMessageType } from '../messages/incoming-messages';

const handleSendMessage = (socket: Socket, payload: UserMessageType): void => {
  const { message, userId } = payload;
  socket.send(`Message: ${message} by ${userId}`);
}

export { handleSendMessage };
