/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { config } from "src/lib/supabase/supabase";
import "src/lib/tailwind.css";
import { MantineProvider } from "@mantine/core";
import { AppShell, Navbar, Header } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
//import { HeaderComp } from "@components/global/Header/HeaderComp";
import { HeadContents } from "@components/global/head/HeadContents";
import { Sidebar } from "@components/global/sideBar/Sidebar";
import { User } from "@components/global/sideBar/User";
import { state, saveUserId, saveUserEmail, saveUserName } from "@state/state";
import dynamic from "next/dynamic";

const HeaderComp = dynamic(async () => {
  const { HeaderComp } = await import("@components/global/Header/HeaderComp");
  return HeaderComp;
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [color, setColor] = useState<"dark" | "light">("dark");
  const toggleColorTheme = () => {
    color === "dark" ? setColor("light") : setColor("dark");
  };
  const router = useRouter();

  useEffect(() => {
    //sessionにユーザーがいる場合それを使用
    const session = config.supabase.auth.session();
    console.log("session", session?.user?.id!);
    if (session?.user?.id! === undefined) {
      router.push("/signin");
    } else {
      saveUserId(session?.user?.id!);
      getUserInfo(session?.user?.id!);
    }
  }, []);

  const getUserInfo = async (userId: string) => {
    const { data, error } = await config.supabase
      .from<{ userName: string; userEmail: string }>("users")
      .select("userName, userEmail")
      .match({ userId: userId });

    if (data) {
      //ユーザーがいない場合、サインインページに移動
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
              <HeaderComp color={color} toggleColorTheme={toggleColorTheme} />
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
};

export default MyApp;
