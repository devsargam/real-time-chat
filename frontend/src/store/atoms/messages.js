import { atom } from 'recoil';

/*
Example state

You: Hello
You: How are you
Them: I'm fine
Them: And you?
You: I'm also fine

This can be representated in an array
[
  {
    by: 'you',
    message: 'hello',
    timestamp: 1212,
  }, ...
]
*/
export const messagesState = atom({
  key: 'userMessagesState',
  default: [],
});
