export type UserId = string;

export interface Chat {
  id: string;
  userId: UserId;
  name: string;
  message: string;
}

export abstract class Store {
  constructor() {}
  initRoom(roomId: string) {}

  getChats(room: string, limit: number, offset: number) {}

  addChat(userId: UserId, name: string, room: string, message: string) {}
}
