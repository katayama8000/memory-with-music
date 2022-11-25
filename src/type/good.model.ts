import type { ArticleModel } from './article.model';
import type { UserModel } from './user.model';

export type GoodModel = {
  id: number;
  articleId: ArticleModel['id'];
  userId: UserModel['userId'];
};
