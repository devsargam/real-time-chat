import { Chat, Store, UserId } from './store';
let globalChatId = 0;

export interface Room {
  roomId: string;
  chats: Chat[];
}

export class InMemoryStore implements Store {
  private store: Map<string, Room>;

  constructor() {
    this.store = new Map<string, Room>();
  }

  initRoom(roomId: string) {
    this.store.set(roomId, {
      roomId,
      chats: [],
    });
  }

  getChats(roomId: string, limit: number, offset: number) {
    const room = this.store.get(roomId);
    if (!room) {
      return [];
    }

    return room.chats
      .reverse()
      .slice(0, offset)
      .slice(-1 * limit);
  }

  addChat({
    userId,
    name,
    roomId,
    message,
  }: {
    userId: string;
    name: string;
    roomId: string;
    message: string;
  }) {
    if (!this.store.get(roomId)) {
      this.initRoom(roomId);
    }
    const room = this.store.get(roomId);
    if (!room) {
      return;
    }
    const chat = {
      id: (globalChatId++).toString(),
      userId,
      name,
      message,
    };

    room.chats.push(chat);
    return chat;
  }
}
