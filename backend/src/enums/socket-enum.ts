import { IncomingMessage } from '../messages/incoming-messages';

export enum ioEvents {
  CONNECTION = 'connection',
  DISCONNECT = 'disconnect',
}

export interface ServerToClientEvents {
  message: (msg: string) => void;
  event: () => void;
  users: (sth: any) => void;
}

export interface ClientToServerEvents {
  message: (message: IncomingMessage) => void;
}
