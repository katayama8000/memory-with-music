/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { supabase } from "src/lib/supabase/supabase";
import "src/lib/tailwind.css";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import { AppShell, Navbar, Header } from "@mantine/core";
//import { HeaderComp } from "@components/global/Header/HeaderComp";
import { HeadContents } from "@components/head/HeadContents";
import { Sidebar } from "@pages/Layout/DashboardLayout/sideNav/SideNav";
import { User } from "@pages/Layout/DashboardLayout/sideNav/User";
import { state, saveUserId, saveUserEmail, saveUserName } from "@state/state";
import dynamic from "next/dynamic";
import { NotificationsProvider } from "@mantine/notifications";
import type { CustomAppPage } from "next/app";
import { useSnapshot } from "valtio";

const myCache = createEmotionCache({ key: "mantine" });

const App: CustomAppPage = ({ Component, pageProps }) => {
  console.log("App.tsx", Component, pageProps);
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
        <NotificationsProvider position="bottom-right" zIndex={2077}>
          <main className="m-auto mt-[50px] max-w-7xl" role="main">
            {getLayout(<Component {...pageProps} />)}
          </main>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
};

export default App;
