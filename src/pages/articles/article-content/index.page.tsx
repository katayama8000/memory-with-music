/* eslint-disable react-hooks/exhaustive-deps */
import { useCountGood } from '@hooks/useCountGood';
import { useGetUserId } from '@hooks/useGetUserId';
import { useIsGoodRelatedToUserId } from '@hooks/useIsGoodRelatedToUserId';
import { Button, TypographyStylesProvider } from '@mantine/core';
import { DashboardLayout } from '@pages/_Layout';
import { GoodIcon } from '@pages/articles/good/goodIcon';
import type { ArticleModel, UserModel } from '@type/index';
import type { CustomNextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { TABLE } from 'src/constant/table.const';
import { toast } from 'src/lib/function/toast';
import { supabase } from 'src/lib/supabase/supabase';

import { DeleteArticleModal } from './DeleteArticleModal';
import { DeleteIcon } from './tooltip/deleteIcon';
import { EditIcon } from './tooltip/editIcon';

const Article: CustomNextPage = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [userIdRelatedArticle, setUserIdRelatedArticle] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [isMyArticle, setIsMyArticle] = useState<boolean>(false);
  const [initArticle, setInitArticle] = useState({
    id: 0,
    artist: '',
    image: '',
    memory: '',
    song: '',
  });
  const router = useRouter();
  const userId = useGetUserId();
  const { countGood } = useCountGood();
  const { isGood } = useIsGoodRelatedToUserId();
  console.log('isGood', isGood);

  const compareUserIdRelatedToArticle = useCallback(async (): Promise<void> => {
    const { data, error } = await supabase
      .from<ArticleModel>(TABLE.SONGS)
      .select('userId')
      .match({ id: router.query.id });

    if (data) {
      data[0].userId === userId ? setIsMyArticle(true) : setIsMyArticle(false);
      setUserIdRelatedArticle(data[0].userId);
    }

    if (error || !data) toast('error', error.message, 'red');
  }, [router.query.id, userId]);

  const getUserNameRelatedToArticle = useCallback(async (): Promise<void> => {
    const { data, error } = await supabase
      .from<{ userName: UserModel['userName'] }>(TABLE.USERS)
      .select('userName')
      .match({ userId: userIdRelatedArticle });

    if (data) setUserName(data[0]?.userName);

    if (error) toast('error', error.message, 'red');
  }, [userIdRelatedArticle]);

  useEffect(() => {
    getUserNameRelatedToArticle();
  }, [userIdRelatedArticle]);

  useEffect(() => {
    if (router.isReady) {
      setInitArticle({
        id: Number(router.query.id),
        artist: router.query.artist as string,
        image: router.query.image as string,
        memory: router.query.memory as string,
        song: router.query.song as string,
      });
      compareUserIdRelatedToArticle();
    }
  }, [router]);

  const handleDelete = useCallback(async (): Promise<void> => {
    const { data, error } = await supabase.from<ArticleModel>(TABLE.SONGS).delete().match({ id: router.query.id });

    if (data) {
      toast('成功', '削除しました', 'cyan');
      router.push('/articles');
    }
    if (error) toast('error', error.message, 'red');

    setOpened(false);
  }, [router]);

  const handleClickGood = useCallback(async () => {
    const { data, error } = await supabase
      .from(TABLE.GOODS)
      .select('id')
      .match({ articleId: Number(router.query.id), userId });
    console.log(data, error);
    if (data) {
      if (data.length === 0) {
        await supabase.from(TABLE.GOODS).insert({ articleId: Number(router.query.id), userId });
      } else {
        await supabase.from(TABLE.GOODS).delete().match({ id: data[0].id });
      }
    }

    if (error) toast('error', error.message, 'red');
  }, [router.query.id, userId]);

  return (
    <article className='m-auto max-w-4xl px-2'>
      <div className='flex items-center justify-between py-4'>
        <div className='flex truncate text-3xl font-extrabold'>
          <span>
            {initArticle.song}/{initArticle.artist}
          </span>
          <span className='ml-2 pt-1'>
            <GoodIcon isGood={isGood} size={30} />
          </span>
          <span className='font-medium'>{countGood}</span>
        </div>
        <Button onClick={handleClickGood}>supabase click</Button>
        <div>
          {isMyArticle && (
            <div className='flex px-4'>
              <div className='mx-1'>
                <DeleteIcon setOpened={setOpened} />
              </div>
              <Link
                href={{
                  pathname: '/write-article',
                  query: {
                    id: initArticle.id,
                    artist: initArticle.artist,
                    image: initArticle.image,
                    isEdit: true,
                    memory: initArticle.memory,
                    song: initArticle.song,
                  },
                }}
              >
                <div className='mx-1 text-inherit'>
                  <EditIcon />
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div>written by : {userName}</div>
      <div className='mt-10 whitespace-pre-wrap'>
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: initArticle.memory }} />
        </TypographyStylesProvider>
      </div>
      <DeleteArticleModal opened={opened} setOpened={setOpened} handleDelete={handleDelete} />
    </article>
  );
};

Article.getLayout = DashboardLayout;
export default Article;
