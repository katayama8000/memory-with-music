import { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { supabase } from "src/lib/supabase/supabase";

export const useIsLoggedIn = () => {
  const { pathname, push, isReady } = useRouter();
  if (isReady) {
    const user: User | null = supabase.auth.user();
    //ユーザーがあるかつログイン画面にいるとき
    if (user && pathname === "/sign-in") {
      push("/");
      //ユーザーがないときかつログイン画面にいるとき
    } else if (!user && pathname === "/sign-in") {
      //ユーザーがないときかつ新規登録画面にいないとき
    } else if (!user && pathname !== "/sign-up") {
      push("/sign-in");
    }
  }
};
