import { Socket } from 'socket.io';
import { ioEvents } from '../enums/socket-enum';

type Users = {
  id: string;
  sock: Socket;
  username?: string;
};

type UsersWithoutSocket = Omit<Users, 'sock'>;

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

  public listUsers(): UsersWithoutSocket[] {
    const users: UsersWithoutSocket[] = [];
    this.users.forEach((user) => {
      users.push({ id: user.sock.id, username: user.username });
    });
    return users;
  }

  public addUser(socket: Socket) {
    // Mock as the user creates the connection
    const id = socket.id;

    console.log(`${id} was added`);
    if (this.users.get(id)) throw new Error('User alreay exists');

    this.users.set(id, { sock: socket, id });

    socket.broadcast.emit('onlineUsers', this.listUsers());

    // Since the given socket has to be listened for disconnected event
    socket.on(ioEvents.DISCONNECT, () => {
      this.removeUser(socket.id);
      socket.broadcast.emit('onlineUsers', this.listUsers());
    });
  }

  public addUsername(socket: Socket, username: string) {
    const { id: socketId } = socket;
    if (!this.users.get(socketId))
      throw new Error('User not found with socketId');

    this.users.set(socketId, { id: socketId, sock: socket, username });
  }

  public getUser(id: string) {
    return this.users.get(id);
  }

  private removeUser(id: string) {
    console.log(`${id} was removed`);
    return this.users.delete(id);
  }
}
