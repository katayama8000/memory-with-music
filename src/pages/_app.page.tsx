import 'src/lib/tailwind.css';

import { HeadContents } from '@components/head/HeadContents';
import { createEmotionCache, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { themeAtom } from '@state/jotai';
import { useAtom } from 'jotai';
import type { CustomAppPage } from 'next/app';

const myCache = createEmotionCache({ key: 'mantine' });

const App: CustomAppPage = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page;
    });

  const [theme] = useAtom(themeAtom);

  return (
    <>
      <HeadContents />
      <MantineProvider
        theme={{
          colorScheme: theme,
        }}
        withGlobalStyles
        withNormalizeCSS
        emotionCache={myCache}
      >
        <NotificationsProvider position='bottom-right' zIndex={2077}>
          <main className='mt-[50px]' role='main'>
            {getLayout(<Component {...pageProps} />)}
          </main>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
};

export default App;
