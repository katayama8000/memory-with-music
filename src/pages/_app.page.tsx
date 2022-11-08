import 'src/lib/tailwind.css';

import { HeadContents } from '@components/head/HeadContents';
import { createEmotionCache, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { state } from '@state/state';
import type { CustomAppPage } from 'next/app';
import { useSnapshot } from 'valtio';

const myCache = createEmotionCache({ key: 'mantine' });

const App: CustomAppPage = ({ Component, pageProps }) => {
  const { color } = useSnapshot(state);
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page;
    });

  return (
    <>
      <HeadContents />
      <MantineProvider
        theme={{
          colorScheme: color,
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
