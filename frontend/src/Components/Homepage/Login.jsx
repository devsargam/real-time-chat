import { useState } from 'react';
import { socket } from '../../socket';

// eslint-disable-next-line react/prop-types
export const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = () => {
    setUser({
      userId: Math.floor(Math.random() * 10000),
      username,
    });
    socket.emit('message', {
      type: 'SET_DETAILS',
      payload: {
        username,
      },
    });
    console.log('sent the username');
  };

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center">
      <div>
        <form className="flex flex-col">
          <input
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <button type="submit" onClick={handleSubmit}>
            Join
          </button>
        </form>
      </div>
    </main>
  );
};
