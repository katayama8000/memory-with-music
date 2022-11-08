import { toast } from '@function/toast';
import { useGetUserId } from '@hooks/useGetUserId';
import type { SongModel } from '@type/article.model';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from 'src/lib/supabase/supabase';

export const useGetUserSongs = (): {
  getUserSongs: () => void;
  isLoading: boolean;
  songList: SongModel[];
} => {
  const [songList, setSongList] = useState<SongModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userID = useGetUserId();
  const getUserSongs = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from<SongModel>('songs')
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
