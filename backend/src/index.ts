import express from 'express';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import { UserManager } from './managers/user-manager';
import {
  IncomingMessage,
  SupportedMessage,
} from './messages/incoming-messages';
import {
  OutgoingMessage,
  SupportedMessage as OutgoingSupportedMessage,
} from './messages/outgoing-messages';
import { InMemoryStore } from './stores/in-memory-store';
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const PORT = +process.env.PORT! ?? 3000;

const userManager = new UserManager();
const store = new InMemoryStore();

app.get('/', (_, res) => {
  res.send('Hello World');
});

io.on('connection', (socket) => {
  socket.send('connection sucessful');
  socket.on('event', (data) => {
    console.log('event here');
    console.log(data);
  });

  socket.on('message', (message: IncomingMessage) => {
    // @ts-ignore
    if (message.type === 'USERS_COUNT') {
      return socket.emit(
        'message',
        // @ts-ignore
        userManager.getUsersCount(message.payload.roomId),
      );
    }

    if (message.type === SupportedMessage.JoinRoom) {
      socket.send('Room joined sucessfully');
      return userManager.addUser(
        message.payload.name,
        message.payload.userId,
        message.payload.roomId,
        socket,
      );
    }

    if (message.type === SupportedMessage.SendMessage) {
      const user = userManager.getUser(
        message.payload.roomId,
        message.payload.userId,
      );

      if (!user) {
        return console.error('User not in db!');
      }

      let chat = store.addChat({
        roomId: message.payload.roomId,
        name: user.name,
        userId: user.id,
        message: message.payload.message,
      });

      if (!chat) return;

      const outgoingPayload: OutgoingMessage = {
        type: OutgoingSupportedMessage.AddChat,
        payload: {
          chatId: chat.id,
          message: message.payload.message,
          name: user.name,
          roomId: message.payload.roomId,
        },
      };

      userManager.broadcast(
        message.payload.roomId,
        message.payload.userId,
        outgoingPayload,
      );
    }
  });

  socket.on('disconnect', () => {
    console.log('someone disconnected');
  });
});

server.listen(PORT, () => {
  console.clear();
  console.info(`Server running on port ${PORT}`);
});
