import { supabase } from 'src/lib/supabase/supabase';

export const useGetStoragePath = (
  buckets: 'application' | 'account',
  folder: 'receipt' | 'avatar'
): string | Error | null => {
  const { error, publicURL } = supabase.storage.from(buckets).getPublicUrl(folder);
  if (publicURL) {
    return publicURL;
  }
  return error;
};
