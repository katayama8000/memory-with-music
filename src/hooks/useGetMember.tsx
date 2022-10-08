/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { supabase } from "src/lib/supabase/supabase";
import { UserModel } from "@type/user.model";

type Result = {
  member: UserModel | undefined;
  getMember: () => void;
};
export const useGetMember = (userID: string): Result => {
  const [member, setMember] = useState<UserModel>();
  const getMember = async (): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from("member")
        .select()
        .match({ userID: userID });
      console.log(data, error);
      if (!data || error) {
        console.error(error);
        return;
      }
      if (data) {
        setMember(data[0]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getMember();
  }, []);

  return { member, getMember };
};
