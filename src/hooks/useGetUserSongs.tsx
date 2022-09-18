import { toast } from "@function/toast";
import { useGetUserId } from "@hooks/useGetUserId";
import { state } from "@state/state";
import { Session } from "@supabase/supabase-js";
import { SongModel } from "@type/song.model";
import { useCallback, useEffect, useState } from "react";
import { config } from "src/lib/supabase/supabase";
import { useSnapshot } from "valtio";

export const useGetUserSongs = () => {
  const [songList, setSongList] = useState<SongModel[]>([]);
  const [loadingFlag, setLoadingFlag] = useState<boolean>(false);
  const userID = useGetUserId();
  const getUserSongs = async () => {
    setLoadingFlag(true);
    try {
      const { data, error } = await config.supabase
        .from("songs")
        .select("id,song, artist,image,memory")
        .match({ userId: userID });
      if (data) {
        console.log("aaa", data);
        setSongList(data);
      }
      if (error || !data) {
        toast("Error", error.message + "try again later", "red");
      }
    } catch {
      toast("Error", "try again later", "red");
    } finally {
      setLoadingFlag(false);
    }
  };

  useEffect(() => {
    getUserSongs();
  }, []);

  return { songList, loadingFlag, getUserSongs };
};
