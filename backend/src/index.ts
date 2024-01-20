import express from 'express';
import dotenv from 'dotenv';
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
dotenv.config();

const app = express();
app.use(express.json());

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

io.on(ioEvents.CONNECTION, (socket) => {
  activeUsers.addUser(socket);

  socket.on('message', (message: IncomingMessage) => {
    console.log(message);
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
  });

  socket.on(ioEvents.DISCONNECT, (sock) => {
    console.log(sock);
  });
});

server.listen(PORT, () => {
  console.clear();
  console.info(`Server running on port ${PORT}`);
});
