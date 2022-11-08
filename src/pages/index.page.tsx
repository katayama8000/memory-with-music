import { SongList } from '@components/home/SongList';
import { useLocale } from '@hooks/useLocale';
import { Box, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DashboardLayout } from '@pages/_Layout';
import type { CountryModel, LangModel } from '@type/i18n.model';
import type { ResultModel } from '@type/result.model';
import axios from 'axios';
import type { CustomNextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Home: CustomNextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [songList, setSongList] = useState<ResultModel>();
  const router = useRouter();

  const { t } = useLocale();

  const form = useForm({
    initialValues: {
      music: '',
    },
  });

  const { API_country, API_lang } = (() => {
    const { locale } = router;
    if (locale === 'en') {
      return {
        API_country: 'us',
        API_lang: 'en_us',
      };
    }
    return {
      API_country: 'jp',
      API_lang: 'ja_jp',
    };
  })() as { API_country: CountryModel; API_lang: LangModel };

  const handleSubmit = useCallback(
    async (values: { music: string }, lang: LangModel, country: CountryModel): Promise<void> => {
      setIsLoading(true);
      const { data } = await axios.get(
        `//itunes.apple.com/search?term=${values.music}&country=${country}&lang=${lang}&media=music&limit=51&offset=0`
      );
      setSongList(data);
      setIsLoading(false);
    },
    []
  );

  return (
    <div className='m-auto max-w-6xl'>
      <div className='flex flex-col justify-center'>
        <Box sx={{ maxWidth: 300 }} mx='auto'>
          <form
            onSubmit={form.onSubmit((values) => {
              return handleSubmit(values, API_lang, API_country);
            })}
            className='mt-2 flex gap-x-2'
          >
            <TextInput
              placeholder={t.SEARCH}
              classNames={{
                input: 'text-base',
              }}
              {...form.getInputProps('music')}
            />
            <Button type='submit' color='cyan'>
              <FaSearch />
            </Button>
          </form>
        </Box>
        <div className='mt-5'>
          <SongList songList={songList!} loading={isLoading} />
        </div>
      </div>
    </div>
  );
};

Home.getLayout = DashboardLayout;
export default Home;
