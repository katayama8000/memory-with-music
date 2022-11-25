/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from '@function/toast';
import { useGetUserId } from '@hooks/useGetUserId';
import type { ArticleModel } from '@type/article.model';
import type { GoodModel } from '@type/good.model';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { TABLE } from 'src/constant/table.const';
import { supabase } from 'src/lib/supabase/supabase';

export const useHandleGood = (): {
  countGood: number;
  handleToggleGood: () => Promise<void>;
  isGood: boolean;
} => {
  const [countGood, setCountGood] = useState<number>(0);
  const [isGood, setIsGood] = useState<boolean>(false);
  const userId = useGetUserId();
  const router = useRouter();

  const countGoodsRelatedToArticle = async (articleId: GoodModel['articleId']) => {
    const { data, error } = await supabase.from<GoodModel>(TABLE.GOODS).select('id').match({ articleId });
    if (data) setCountGood(data.length);
    if (error) toast('Error', error.message + 'try again later', 'red');
  };

  const isGoodRelatedToUserId = async (articleId: ArticleModel['id']) => {
    const { data, error } = await supabase
      .from<GoodModel>(TABLE.GOODS)
      .select('id,userId,articleId')
      .match({ articleId: articleId, userId: userId });

    if (data) data.length > 0 ? setIsGood(true) : setIsGood(false);
    if (error) console.log(error);
  };

  const handleToggleGood = useCallback(async () => {
    const { data, error } = await supabase
      .from(TABLE.GOODS)
      .select('id')
      .match({ articleId: Number(router.query.id), userId });
    console.log(data, error);
    if (data) {
      if (data.length === 0) {
        await supabase.from(TABLE.GOODS).insert({ articleId: Number(router.query.id), userId });
        countGoodsRelatedToArticle(Number(router.query.id));
        isGoodRelatedToUserId(Number(router.query.id));
      } else {
        await supabase.from(TABLE.GOODS).delete().match({ id: data[0].id });
        countGoodsRelatedToArticle(Number(router.query.id));
        isGoodRelatedToUserId(Number(router.query.id));
      }
    }

    if (error) toast('error', error.message, 'red');
  }, [router.query.id, userId]);

  useEffect(() => {
    const mySubscription = supabase
      .from<ArticleModel>(TABLE.GOODS)
      .on('*', (payload) => {
        console.log('Change received!', payload);
      })
      .subscribe();

    countGoodsRelatedToArticle(Number(router.query.id));
    isGoodRelatedToUserId(Number(router.query.id));
    return () => {
      mySubscription.unsubscribe();
    };
  }, [router.query.id]);

  return { countGood, handleToggleGood, isGood };
};
