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
  }) {}
}
