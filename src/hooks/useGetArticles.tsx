import type { ArticleModel } from '@type/article.model';
import useSWR from 'swr';

const fetcher = async (args: string) => {
  const ret = await fetch(args);
  return ret.json();
};
export const useGetArticles = () => {
  const { data, error } = useSWR<ArticleModel[]>('./api/articles', fetcher);
  return {
    articles: data,
    isError: error,
    isLoading: !error && !data,
  };
};
