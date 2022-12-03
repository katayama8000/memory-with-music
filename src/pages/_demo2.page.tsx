import { Button } from '@mantine/core';
import type { ChatRoomModel } from '@type/chatroom.model';
import type { MessageModel } from '@type/message.model';
import { TABLE } from 'src/constant/table.const';
import { supabase } from 'src/lib/supabase/supabase';

const Demo2 = () => {
  const handleClickChatRoom = async () => {
    console.log('click');
    const { data, error } = await supabase.from<ChatRoomModel>(TABLE.CHATROOM).insert({
      articleId: 27,
      userId: 'd304775b-4155-4297-9dc7-eb2bde2172e3',
    });
    console.log('data: ', data, 'error: ', error);
  };

  const handleClickMessage = async () => {
    console.log('click');
    const { data, error } = await supabase.from<MessageModel>(TABLE.MESSAGES).insert({
      chatRoomId: 1,
      message: 'hello',
      userId: 'd304775b-4155-4297-9dc7-eb2bde2172e3',
    });
    console.log('data: ', data, 'error: ', error);
  };
  return (
    <div>
      <h1>demo2</h1>
      <Button onClick={handleClickChatRoom}>handleClickChatRoom</Button>
      <Button onClick={handleClickMessage}>handleClickMessage</Button>
    </div>
  );
};

export default Demo2;
