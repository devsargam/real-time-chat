import Infobox from './Infobox';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((res) => res.json())
      .then((usersFromRes) => {
        if (!usersFromRes) return;

        setUsers(usersFromRes);
      });
  }, []);

  return (
    <div className="border-r-2 px-2 m-1 w-max h-screen flex flex-col gap-4">
      <div className="logoContainer px-1 py-3">
        <p>Guff Gaff</p>
      </div>
      <div className="flex flex-col gap-1 ">
        {!users.length ? (
          <h1>No Users Online</h1>
        ) : (
          users.map((user, index) => {
            return <Infobox key={index} username={user.username} />;
          })
        )}
      </div>
    </div>
  );
};

export default Sidebar;
