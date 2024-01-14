import z from 'zod';

export enum SupportedMessage {
  JoinRoom = 'JOIN_ROOM',
  SendMessage = 'SEND_MESSAGE',
  GetUsers = 'GET_USERS',
}

export type IncomingMessage =
  | {
      type: SupportedMessage.JoinRoom;
      payload: InitMessageType;
    }
  | {
      type: SupportedMessage.SendMessage;
      payload: UserMessageType;
    }
  | {
      type: SupportedMessage.GetUsers;
      payload: GetUsersType;
    };

export const InitMessage = z.object({
  name: z.string(),
  userId: z.string(),
  roomId: z.string(),
});

export type InitMessageType = z.infer<typeof InitMessage>;

export const UserMessage = z.object({
  userId: z.string(),
  roomId: z.string(),
  message: z.string(),
});

export type UserMessageType = z.infer<typeof UserMessage>;

export const GetUsers = z.object({
  roomId: z.string(),
});

export type GetUsersType = z.infer<typeof GetUsers>;
