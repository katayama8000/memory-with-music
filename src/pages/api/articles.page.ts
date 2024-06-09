import type { ArticleModel } from '@type/article.model';
import type { NextApiRequest, NextApiResponse } from 'next';
import { TABLE } from 'src/constant/table.const';
import { supabase } from 'src/lib/supabase/supabase';

const getUsersAPI = async (_req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await supabase.from<ArticleModel>(TABLE.ARTICLES).select();
  if (error) {
    return res.status(401).json({ error: error.message });
  }
  return res.status(200).json(data);
};

export default getUsersAPI;
