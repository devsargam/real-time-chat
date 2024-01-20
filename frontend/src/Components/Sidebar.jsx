import Infobox from './Infobox';
import { socket } from '../socket';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const [users, SetUsers] = useState([]);

  const onUsers = (data) => {
    console.log(data);
    SetUsers(data ?? []);
  };

  useEffect(() => {
    socket.on('onlineUsers', onUsers);

    return () => {
      socket.off('online-users', onUsers);
    };
  }, []);

  useEffect(() => {
    socket.send({
      type: 'GET_USERS',
      payload: {
        roomId: 1,
      },
    });
  }, []);

  return (
    <div className="border-r-2 px-2 m-1 w-max h-screen flex flex-col gap-4">
      <div className="logoContainer px-1 py-3">
        <p>Guff Gaff</p>
      </div>
      <div className="flex flex-col gap-1 ">
        {JSON.stringify(users)}
        {!users.length ? (
          <Infobox />
        ) : (
          users.map((user) => {
            return <Infobox />;
          })
        )}
      </div>
    </div>
  );
};

export default Sidebar;
