import { supabase } from 'src/lib/supabase/supabase';

export const useGetUserId = (): string | null | undefined => {
  const session = supabase.auth.session();
  return session ? session.user?.id : null;
};
