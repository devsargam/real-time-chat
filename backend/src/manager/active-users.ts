import { Socket } from 'socket.io';
import { ioEvents } from '../enums/socket-enum';

type Users = Socket;

export class ActiveUsers {
  private static instance: ActiveUsers;
  private users;

  private constructor() {
    this.users = new Map<string, Users>();
  }

  public static getInstance(): ActiveUsers {
    if (!ActiveUsers.instance) {
      ActiveUsers.instance = new ActiveUsers();
    }
    return ActiveUsers.instance;
  }

  public listUsers(): Array<string> {
    return Array.from(this.users.keys());
  }

  public addUser(socket: Socket) {
    // Mock as the user creates the connection
    const id = socket.id;

    console.log(`${id} was added`);
    if (this.users.get(id)) throw new Error('User alreay exists');

    this.users.set(id, socket);

    socket.broadcast.emit('onlineUsers', this.listUsers());

    // Since the given socket has to be listened for disconnected event
    socket.on(ioEvents.DISCONNECT, () => {
      this.removeUser(socket.id);
      socket.broadcast.emit('onlineUsers', this.listUsers());
    });
  }

  public getUser(id: string) {
    console.log(`${id} was searched`);
    return this.users.get(id) ?? {};
  }

  private removeUser(id: string) {
    console.log(`${id} was removed`);
    return this.users.delete(id);
  }
}
