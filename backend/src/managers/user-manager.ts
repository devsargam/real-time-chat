import { Socket } from 'socket.io';
import { OutgoingMessage } from '../messages/outgoing-messages';

interface User {
  name: string;
  id: string;
  socket: Socket;
}

interface IRoom {
  users: User[];
}

export class UserManager {
  private rooms: Map<string, IRoom>;

  constructor() {
    this.rooms = new Map<string, IRoom>();
  }

  addUser(name: string, userId: string, roomId: string, socket: Socket) {
    if (!this.rooms.get(roomId)) {
      this.rooms.set(roomId, {
        users: [],
      });
    }
    this.rooms.get(roomId)?.users.push({
      id: userId,
      name,
      socket: socket,
    });
    socket.on('close', (reasonCode, description) => {
      this.removeUser(roomId, userId);
    });
  }

  removeUser(roomId: string, userId: string) {
    console.log('removed user');
    const users = this.rooms.get(roomId)?.users;
    if (users) {
      users.filter(({ id }) => id !== userId);
    }
  }

  getUser(roomId: string, userId: string): User | null {
    const user = this.rooms.get(roomId)?.users.find(({ id }) => id === userId);
    return user ?? null;
  }

  broadcast(roomId: string, userId: string, message: OutgoingMessage) {
    const user = this.getUser(roomId, userId);
    if (!user) {
      console.error('User not found');
      return;
    }

    const room = this.rooms.get(roomId);
    if (!room) {
      console.error('Room not found');
      return;
    }

    room.users.forEach(({ socket, id }) => {
      // Do not send message to author
      if (userId === id) return;
      socket.send(JSON.stringify(message));
    });
  }
}
