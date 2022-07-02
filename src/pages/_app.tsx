/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { config } from "src/lib/supabase/supabase";
import "src/lib/tailwind.css";
import {
  ActionIcon,
  Loader,
  MantineProvider,
  SegmentedControl,
  AppShell,
  Navbar,
  Header,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { HeadContents } from "@components/global/head/HeadContents";
import { Sidebar } from "@components/global/sideBar/Sidebar";
import { User } from "@components/global/sideBar/User";
import { ColorTheme } from "@components/global/Header";
import { Lang } from "@components/global/Header";
import { state, saveUserId, saveUserEmail, saveUserName } from "@state/state";

function MyApp({ Component, pageProps }: AppProps) {
  const [color, setColor] = useState<"dark" | "light">("dark");
  const toggleColorTheme = () => {
    color === "dark" ? setColor("light") : setColor("dark");
  };
  const router = useRouter();

  useEffect(() => {
    const session = config.supabase.auth.session();
    saveUserId(session?.user?.id!);
    getUserInfo(session?.user?.id!);
  }, []);

  const getUserInfo = async (userId: string) => {
    const { data, error } = await config.supabase
      .from("users")
      .select("userName, userEmail")
      .match({ userId: userId });

    console.log(data, error);
    if (data) {
      //ユーザーがいない場合、サインインに飛ばす
      if (data.length === 0) {
        router.push("/signin");
      } else {
        const userName = data![0].userName;
        const userEmail = data![0].userEmail;
        saveUserName(userName);
        saveUserEmail(userEmail);
      }
    }

    if (error) {
      router.push("/signin");
    }
  };

  return (
    <>
      <HeadContents />
      <MantineProvider
        theme={{
          colorScheme: color,
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppShell
          padding="md"
          navbar={
            <Navbar
              p="xs"
              width={{ base: 300 }}
              hidden={true}
              hiddenBreakpoint={1000}
              fixed={true}
            >
              <Navbar.Section grow mt="md">
                <Sidebar color={color} />
              </Navbar.Section>
              <Navbar.Section>
                <User />
              </Navbar.Section>
            </Navbar>
          }
          header={
            <Header height={70} p="xs" fixed={true} zIndex={200}>
              <div className="relative flex justify-center ">
                <div className="ml-[284px] pr-2 pb-2  text-4xl font-bold italic hover:not-italic">
                  memory with music
                </div>
                <Loader color="cyan" size="sm" variant="bars" />
                <div className=" absolute right-0 flex">
                  <div className="mt-[6px]">
                    <ColorTheme color={color} onClick={toggleColorTheme} />
                  </div>
                  <div>
                    <Lang />
                  </div>
                </div>
              </div>
            </Header>
          }
        >
          <NotificationsProvider position="bottom-right" zIndex={2077}>
            <main className="m-auto mt-[100px] max-w-6xl pl-[300px]">
              <Component {...pageProps} />
            </main>
          </NotificationsProvider>
        </AppShell>
      </MantineProvider>
    </>
  );
}

export default MyApp;
