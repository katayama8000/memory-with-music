import type { ArticleModel } from './article.model';
import type { results } from './result.model';

type SongCardModel = Pick<results, 'artistName' | 'releaseDate' | 'trackName'> & {
  isLoading: boolean;
  url: string;
};

type ArticleCardModel = Pick<ArticleModel, 'id' | 'artist' | 'image' | 'memory' | 'song'>;

export type { ArticleCardModel, SongCardModel };
