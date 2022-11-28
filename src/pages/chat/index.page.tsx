import { DashboardLayout } from '@pages/_Layout';
import type { CustomNextPage } from 'next';

const Chat: CustomNextPage = () => {
  return (
    <div>
      <h1>chat</h1>
    </div>
  );
};

Chat.getLayout = DashboardLayout;
export default Chat;
