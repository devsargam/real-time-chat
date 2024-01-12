import { useEffect, useState } from 'react';
import { socket } from './socket';
import Homepage from './Components/Homepage/Homepage';
import { Login } from './Components/Homepage/Login';

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({
    username: '',
    userId: 0,
  });
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessage(value) {
      setMessages((prev) => [...prev, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    socket.on('message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessage);
    };
  }, []);

  useEffect(() => {
    if (isConnected && user.username) {
      socket.send({
        type: 'JOIN_ROOM',
        payload: { name: user.username, userId: user.userId, roomId: 1 },
      });
      socket.send({
        type: 'USERS_COUNT',
        payload: { roomId: 1 },
      });
    }
  }, [isConnected, user.username, user.userId]);

  if (!user.username) {
    return <Login setUser={setUser} />;
  }

  return (
    <>
      {/* <Sidebar /> */}
      {JSON.stringify({
        isConnected,
        messages,
        userCount,
      })}
      {/* <Homepage /> */}
    </>
  );
};

export default App;
