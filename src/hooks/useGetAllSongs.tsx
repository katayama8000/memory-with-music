import { toast } from "@function/toast";
import { SongModel } from "@type/song.model";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "src/lib/supabase/supabase";

export const useGetAllSongs = () => {
  const [songList, setSongList] = useState<SongModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getAllSongs = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from<SongModel>("songs").select();
      if (data) {
        setSongList(data);
      }
      if (error) {
        toast("Error", error.message + "try again later", "red");
      }
    } catch {
      toast("Error", "try again later", "red");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllSongs();
  }, []);

  return { songList, isLoading, getAllSongs };
};
