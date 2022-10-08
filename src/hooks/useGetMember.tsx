/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { supabase } from "src/lib/supabase/supabase";
import { MemberModel } from "@type/index";

type Result = {
  member: MemberModel | undefined;
  getMember: () => void;
};
export const useGetMember = (userID: string): Result => {
  const [member, setMember] = useState<MemberModel>();
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
