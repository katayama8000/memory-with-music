/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from '@function/toast';
import { useGetUserId } from '@hooks/useGetUserId';
import { useLocale } from '@hooks/useLocale';
import { Button, Group, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DashboardLayout } from '@pages/_Layout';
import type { ArticleModel } from '@type/article.model';
import type { CustomNextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { supabase } from '../../lib/supabase/supabase';

type initType = {
  artist: string;
  image: string;
  isEdit: string;
  memory: string;
  song: string;
};

const WriteArticle: CustomNextPage = () => {
  const userID = useGetUserId();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useLocale();
  const [initForm, setInitForm] = useState<initType>({
    artist: '',
    image: '',
    isEdit: '',
    memory: '',
    song: '',
  });

  const form = useForm({
    initialValues: {
      artist: '',
      image: '',
      memory: '',
      song: '',
    },
  });

  useEffect(() => {
    if (router.isReady) {
      if (
        typeof router.query.artist === 'string' &&
        typeof router.query.song === 'string' &&
        typeof router.query.image === 'string' &&
        typeof router.query.isEdit === 'string'
      ) {
        setInitForm({
          artist: router.query.artist,
          image: router.query.image,
          isEdit: router.query.isEdit,
          memory: '',
          song: router.query.song,
        });
      }
    }
  }, [router]);

  useEffect(() => {
    form.setValues({
      artist: initForm.artist,
      image: initForm.image,
      memory: initForm.memory,
      song: initForm.song,
    });
  }, [initForm]);

  const handleAddArticle = async (values: {
    artist: string | string[] | undefined;
    image: string | string[] | undefined;
    memory: string | string[] | undefined;
    song: string | string[] | undefined;
  }): Promise<void> => {
    setIsLoading(true);

    const { data, error } = await supabase.from('songs').insert([
      {
        artist: values.artist,
        image: values.image,
        memory: values.memory,
        song: values.song,
        userId: userID,
      },
    ]);

    if (data) {
      toast(t.NOTIFICATION.SUCCESS, t.NOTIFICATION.MESSAGE, 'cyan');
      setTimeout(() => {
        router.push('/articles');
      }, 1000);
    }
    if (error) {
      toast(t.NOTIFICATION.ERROR, error.message, 'red');
    }
    setIsLoading(false);
  };

  const handleUpDateArticle = async (values: Pick<ArticleModel, 'artist' | 'memory' | 'song'>) => {
    const { data, error } = await supabase.from<ArticleModel>('songs').update({ memory: values.memory }).match({
      artist: values.artist,
      song: values.song,
      userId: userID,
    });

    if (data) {
      toast(t.NOTIFICATION.SUCCESS, t.NOTIFICATION.MESSAGE, 'cyan');
      setTimeout(() => {
        router.push('/articles');
      }, 1000);
    }

    if (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (values: Omit<ArticleModel, 'id' | 'created_at' | 'userId'>) => {
    initForm.isEdit === 'true' ? handleUpDateArticle(values) : handleAddArticle(values);
  };

  return (
    <div className='m-auto max-w-6xl'>
      <div className='flex flex-col justify-center px-2'>
        <Group position='right' mt='md'>
          {initForm.isEdit == 'true' && (
            <Button
              color='pink'
              onClick={() => {
                return console.log(initForm.isEdit);
              }}
            >
              {t.FORM.EDIT}
            </Button>
          )}
        </Group>
        <form
          onSubmit={form.onSubmit((values) => {
            return handleSubmit(values);
          })}
          className='mt-2'
        >
          <TextInput required placeholder={t.FORM.ARTIST} {...form.getInputProps('artist')} className='mt-2' />
          <TextInput required placeholder={t.FORM.SONG} {...form.getInputProps('song')} className='mt-2' />
          <TextInput placeholder={t.FORM.IMAGE} {...form.getInputProps('image')} className='mt-2' />
          <Textarea
            placeholder={t.FORM.YOURMEMORY}
            required
            autosize
            minRows={10}
            maxRows={13}
            {...form.getInputProps('memory')}
            className='mt-2'
          />
          <Group position='right' mt='md'>
            <Button color='cyan' className='mt-2' type='submit' loading={isLoading}>
              {t.POST}
            </Button>
          </Group>
        </form>
      </div>
    </div>
  );
};

WriteArticle.getLayout = DashboardLayout;
export default WriteArticle;
