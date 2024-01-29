import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { Server } from 'socket.io';
import http from 'http';

import {
  IncomingMessage,
  SupportedMessage,
} from './messages/incoming-messages';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  ioEvents,
} from './enums/socket-enum';
import { handleSendMessage } from './handlers/messages';
import { listActiveUsers } from './handlers/get-users';
import { handleJoinRoom } from './handlers/join-room';
import { ActiveUsers } from './manager/active-users';

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: '*',
  },
});
const activeUsers = ActiveUsers.getInstance();

const PORT = +process.env.PORT! ?? 3000;

app.get('/', (_, res) => {
  res.send('Hello World');
});

app.get('/users', (_, res) => {
  res.json(activeUsers.listUsers());
});

io.on(ioEvents.CONNECTION, (socket) => {
  activeUsers.addUser(socket);

  socket.on('message', (message: IncomingMessage) => {
    console.log(socket.id);

    if (message.type === SupportedMessage.SetDetails) {
      activeUsers.addUsername(socket, message.payload.username);
    }

    if (message.type === SupportedMessage.GetUsers) {
      socket.emit('onlineUsers', listActiveUsers(socket));
    }

    if (message.type === SupportedMessage.JoinRoom) {
      socket.broadcast.emit('message', 'Room joined sucessfully');
      console.log(2);
      handleJoinRoom(socket, message.payload);
    }

    if (message.type === SupportedMessage.SendMessage) {
      handleSendMessage(socket, message.payload);
      console.log(3);
    }

    if (message.type === SupportedMessage.SendDm) {
      io.to(message.payload.userId).emit('message', message.payload.message);
    }
  });

  socket.on(ioEvents.DISCONNECT, (sock) => {
    console.log(sock);
  });
});

server.listen(PORT, () => {
  console.clear();
  console.info(`Server running on port ${PORT}`);
});
