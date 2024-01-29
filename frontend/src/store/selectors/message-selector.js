import { selector } from 'recoil';
import { messagesState } from '../atoms';

export const getUserMessagesSelector = (userId) =>
  selector({
    key: 'userMessageSelector',
    get: ({ get }) => {
      const messages = get(messagesState);

      if (messages[userId]) return messages[userId];

      return [];
    },
  });
