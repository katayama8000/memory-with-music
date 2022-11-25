/* eslint-disable react-hooks/exhaustive-deps */
import { useGetUserId } from '@hooks/useGetUserId';
import type { ArticleModel } from '@type/article.model';
import type { GoodModel } from '@type/good.model';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TABLE } from 'src/constant/table.const';
import { supabase } from 'src/lib/supabase/supabase';

export const useIsGoodRelatedToUserId = (): {
  isGood: boolean;
} => {
  const [isGood, setIsGood] = useState<boolean>(false);
  const userId = useGetUserId();
  const router = useRouter();

  // 記事を取得して自分のuserIdと一致しているか確認
  const isGoodRelatedToUserId = async (articleId: ArticleModel['id']) => {
    const { data, error } = await supabase
      .from<GoodModel>(TABLE.GOODS)
      .select('id,userId,articleId')
      .match({ articleId: articleId, userId: userId });

    if (data) data.length > 0 ? setIsGood(true) : setIsGood(false);
    if (error) console.log(error);
  };

  useEffect(() => {
    if (router.isReady) {
      isGoodRelatedToUserId(Number(router.query.id));
    }
  }, [router.isReady, router.query.id]);

  return { isGood };
};
