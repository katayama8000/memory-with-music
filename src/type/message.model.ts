import type { ChatRoomModel } from '@type/chatroom.model';
import type { UserModel } from '@type/user.model';

export type MessageModel = {
  id: number;
  chatRoomId: ChatRoomModel['id'];
  created_at: string;
  message: string;
  userId: UserModel['userId'];
};
