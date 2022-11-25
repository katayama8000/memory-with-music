import { toast } from '@function/toast';
import type { GoodModel } from '@type/good.model';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TABLE } from 'src/constant/table.const';
import { supabase } from 'src/lib/supabase/supabase';

export const useCountGood = (): {
  countGood: number;
} => {
  const [countGood, setCountGood] = useState<number>(0);
  const router = useRouter();

  const countGoodsRelatedToArticle = async (articleId: GoodModel['articleId']) => {
    const { data, error } = await supabase.from<GoodModel>(TABLE.GOODS).select('id').match({ articleId });
    if (data) setCountGood(data.length);
    if (error) toast('Error', error.message + 'try again later', 'red');
  };

  useEffect(() => {
    if (router.isReady) {
      countGoodsRelatedToArticle(Number(router.query.id));
    }
  }, [router.isReady, router.query.id]);

  return { countGood };
};
