import type { SongModel } from '@type/article.model';
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from 'src/lib/supabase/supabase';

const getUsersAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await supabase.from<SongModel>('songs').select();
  if (error) {
    return res.status(401).json({ error: error.message });
  }
  return res.status(200).json(data);
};

export default getUsersAPI;
