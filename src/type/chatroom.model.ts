import type { ArticleModel, UserModel } from '@type/index';

export type ChatRoomModel = {
  id: number;
  articleId: ArticleModel['id'];
  created_at: string;
  userId: UserModel['userId'];
};
