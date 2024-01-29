import z from 'zod';

export enum SupportedMessage {
  JoinRoom = 'JOIN_ROOM',
  SendMessage = 'SEND_MESSAGE',
  GetUsers = 'GET_USERS',
  SendDm = 'SEND_DM',
  SetDetails = 'SET_DETAILS',
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
    }
  | {
      type: SupportedMessage.SendDm;
      payload: SendDmType;
    }
  | {
      type: SupportedMessage.SetDetails;
      payload: SetDetailsType;
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

export const SendDm = z.object({
  userId: z.string(),
  message: z.string(),
  timestamp: z.date(),
});

export type SendDmType = z.infer<typeof SendDm>;

export const SetDetails = z.object({
  username: z.string(),
});

export type SetDetailsType = z.infer<typeof SetDetails>;
