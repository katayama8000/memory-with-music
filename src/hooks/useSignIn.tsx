import { toast } from "@function/toast";
import { supabase } from "src/lib/supabase/supabase";

type Form = {
  email: string;
  password: string;
};

export const useSignIn = async (value: Form): Promise<void> => {
  console.log(value);
  const { user, session, error } = await supabase.auth.signIn({
    email: value.email,
    password: value.password,
  });

  if (user) {
    console.log(user);
    toast("success", "ログインに成功しました", "cyan");
  }
  if (session) {
    toast("success", "this is session", "cyan");
  }
  if (error) {
    console.log(error);
    toast("success", "失敗", "red");
  }
};
