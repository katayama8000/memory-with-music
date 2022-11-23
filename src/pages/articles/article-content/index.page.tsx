/* eslint-disable react-hooks/exhaustive-deps */
import { useGetUserId } from '@hooks/useGetUserId';
import { TypographyStylesProvider } from '@mantine/core';
import { DashboardLayout } from '@pages/_Layout';
import type { ArticleModel, UserModel } from '@type/index';
import type { CustomNextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'src/lib/function/toast';
import { supabase } from 'src/lib/supabase/supabase';

import { GoodIcon } from '../good/goodIcon';
import { DeleteArticleModal } from './DeleteArticleModal';
import { DeleteIcon } from './tooltip/deleteIcon';
import { EditIcon } from './tooltip/editIcon';

const Article: CustomNextPage = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [userIdRelatedArticle, setUserIdRelatedArticle] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const router = useRouter();
  const userId = useGetUserId();
  const [isMyArticle, setIsMyArticle] = useState<boolean>(false);
  const [initArticle, setInitArticle] = useState({
    id: 0,
    artist: '',
    image: '',
    memory: '',
    song: '',
  });

  const compareUserIdRelatedToArticle = useCallback(async () => {
    const { data, error } = await supabase.from<ArticleModel>('songs').select('userId').match({ id: router.query.id });

    if (data) {
      data[0].userId === userId ? setIsMyArticle(true) : setIsMyArticle(false);
      setUserIdRelatedArticle(data[0].userId);
    }

    if (error || !data) {
      toast('error', error.message, 'red');
    }
  }, [router.query.id, userId]);

  const getUserNameRelatedToArticle = useCallback(async () => {
    const { data, error } = await supabase
      .from<UserModel>('users')
      .select('userName')
      .match({ userId: userIdRelatedArticle });

    if (data) {
      setUserName(data[0]?.userName);
    }

    if (error) {
      toast('error', error.message, 'red');
    }
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
    const { data, error } = await supabase.from<ArticleModel>('songs').delete().match({ id: router.query.id });

    if (data) {
      toast('成功', '削除しました', 'cyan');
      router.push('/articles');
    }
    if (error) {
      toast('error', error.message, 'red');
    }
    setOpened(false);
  }, [router]);

  const [isGood, setIsGood] = useState<boolean>(false);

  return (
    <article className='m-auto max-w-4xl px-2'>
      <div className='flex items-center justify-between py-4'>
        <div className='flex truncate text-3xl font-extrabold'>
          <span>
            {initArticle.song}/{initArticle.artist}
          </span>
          <span className='ml-2 pt-1'>
            <GoodIcon isGood={isGood} size={30} setIsGood={setIsGood} />
          </span>
          <span className='font-medium'>2</span>
        </div>
        <div></div>
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
