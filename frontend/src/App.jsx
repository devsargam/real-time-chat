import { useEffect, useState } from 'react';
import { socket } from './socket';
import Homepage from './Components/Homepage/Homepage';
import { Login } from './Components/Homepage/Login';
import Sidebar from './Components/Sidebar';

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({
    username: '',
    userId: 0,
  });
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    socket.connect();

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
      socket.disconnect();
    };
  }, []);

  if (!user.username) {
    return <Login setUser={setUser} />;
  }

  if (!isConnected) {
    return <h1>Connecting....</h1>;
  }

  return (
    <>
      <Homepage />
    </>
  );
};

export default App;
