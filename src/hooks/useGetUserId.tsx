import { Session } from "@supabase/supabase-js";
import { config } from "src/lib/supabase/supabase";

export const useGetUserId = (): string | null => {
  const session: Session | null = config.supabase.auth.session();
  return session ? session.user!.id : null;
};
