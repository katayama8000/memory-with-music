import { useGetUserId } from "@hooks/useGetUserId";
import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "src/lib/supabase/supabase";
import { Id } from "tabler-icons-react";

export const useGetUserName = (): {
  userName: string | null;
  getUserName: () => void;
} => {
  const [userName, setUserName] = useState<string | null>(null);
  const userID = useGetUserId();
  const getUserName = useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from<{ userName: string }>("users")
        .select("userName")
        .match({ userId: userID });
      if (data) {
        const userName = data![0].userName;
        setUserName(userName);
      }
      if (error || !data) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }, [userID]);

  useEffect(() => {
    getUserName();
  }, []);

  return { userName, getUserName };
};
