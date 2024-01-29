import Sidebar from '../Sidebar';
import { Chat } from '../Chat';

const Homepage = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <Chat userId="something" />
    </div>
  );
};

export default Homepage;
