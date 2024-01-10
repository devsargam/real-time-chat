import express from 'express';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = +process.env.PORT! ?? 3000;

app.get('/', (_, res) => {
  res.send('Hello World');
});

io.on('connection', () => {
  console.log('someone connected to this chat');
});

server.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
