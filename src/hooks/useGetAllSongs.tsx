import { toast } from "@function/toast";
import { SongModel } from "@type/song.model";
import { useCallback, useEffect, useState } from "react";
import { config } from "src/lib/supabase/supabase";

export const useGetAllSongs = () => {
  const [songList, setSongList] = useState<SongModel[]>([]);
  const [loadingFlag, setLoadingFlag] = useState<boolean>(false);
  const getAllSongs = useCallback(async () => {
    setLoadingFlag(true);
    try {
      const { data, error } = await config.supabase
        .from<SongModel>("songs")
        .select();
      if (data) {
        setSongList(data);
      }
      if (error) {
        toast("Error", error.message + "try again later", "red");
      }
    } catch {
      toast("Error", "try again later", "red");
    } finally {
      setLoadingFlag(false);
    }
  }, []);

  useEffect(() => {
    getAllSongs();
  }, []);

  return { songList, loadingFlag, getAllSongs };
};
