import { useGetUserId } from "@hooks/useGetUserId";
import React, { useState, useEffect, useCallback } from "react";
import { config } from "src/lib/supabase/supabase";

export const useGetUserName = (): {
  userName: string | null;
  getUserName: () => void;
} => {
  const [userName, setUserName] = useState<string | null>(null);
  const userID = useGetUserId();
  const getUserName = useCallback(async () => {
    const { data, error } = await config.supabase
      .from("users")
      .select("userName")
      .match({ userId: userID });

    console.log(data, error);
    const userName = data![0].userName;
    console.log(userName);
    setUserName(userName);
  }, [userID]);

  useEffect(() => {
    getUserName();
  }, []);
  return { userName, getUserName };
};
