import { useEffect, useState } from 'react';
import { socket } from './socket';
import Homepage from './Components/Homepage/Homepage';

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', (data) => {
      setFooEvents((prev) => [...prev, data]);
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  return (
    <>
      {/* <Sidebar /> */}
      {JSON.stringify({
        isConnected,
        fooEvents,
      })}
      <Homepage />
    </>
  );
};

export default App;
