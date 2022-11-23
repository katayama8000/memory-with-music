import { toast } from '@function/toast';
import { useGetUserId } from '@hooks/useGetUserId';
import type { ArticleModel } from '@type/article.model';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from 'src/lib/supabase/supabase';

export const useGetUserSongs = (): {
  getUserSongs: () => Promise<void>;
  isLoading: boolean;
  songList: ArticleModel[];
} => {
  const [songList, setSongList] = useState<ArticleModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userID = useGetUserId();
  const getUserSongs = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from<ArticleModel>('songs')
        .select('id,song, artist,image,memory')
        .match({ userId: userID });
      if (data) {
        setSongList(data);
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
    getUserSongs();
  }, [getUserSongs]);

  return { getUserSongs, isLoading, songList };
};
