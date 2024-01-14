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
dotenv.config();

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: '*',
  },
});

const PORT = +process.env.PORT! ?? 3000;

app.get('/', (_, res) => {
  res.send('Hello World');
});

io.on(ioEvents.CONNECTION, (socket) => {
  socket.on('message', (message: IncomingMessage) => {
    if (message.type === SupportedMessage.GetUsers) {
      const users = [{ id: 1, name: 'sargam' }];
      socket.emit('users', users);
    }

    if (message.type === SupportedMessage.JoinRoom) {
      socket.broadcast.emit('message', 'Room joined sucessfully');

      // Logic to add user
      return;
    }

    if (message.type === SupportedMessage.SendMessage) {
      // Logic to send message
    }
  });

  socket.on(ioEvents.DISCONNECT, () => {
    console.log('someone disconnected');
  });
});

server.listen(PORT, () => {
  console.clear();
  console.info(`Server running on port ${PORT}`);
});
