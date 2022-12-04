import { useGetUserId } from '@hooks/useGetUserId';
import type { ArticleModel } from '@type/article.model';
import { useCallback, useEffect, useState } from 'react';
import { TABLE } from 'src/constant/table.const';
import { toast } from 'src/lib/function/toast';
import { supabase } from 'src/lib/supabase/supabase';

export const useGetUserArticles = (): {
  articleList: ArticleModel[];
  getUserArticles: () => Promise<void>;
  isLoading: boolean;
} => {
  const [articleList, setArticleList] = useState<ArticleModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userID = useGetUserId();
  const getUserArticles = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from<ArticleModel>(TABLE.ARTICLES)
        .select('id,song, artist,image,memory')
        .match({ userId: userID });
      if (data) {
        setArticleList(data);
      }
      if (error || !data) {
        toast('Error', error.message + 'try again later', 'red');
      }
    } catch {
      toast('Error', 'try again later', 'red');
    } finally {
      setIsLoading(false);
    }
  }, [userID]);

  useEffect(() => {
    getUserArticles();
  }, [getUserArticles]);

  return { articleList, getUserArticles, isLoading };
};
