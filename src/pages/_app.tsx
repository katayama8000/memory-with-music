import { useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import "src/lib/tailwind.css";
import { MoonStars, Sun } from "tabler-icons-react";
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
import { useLocale } from "@hooks/useLocale";
import { User } from "@components/layout/user/User";

type LinksType = {
  url: string;
  label: string;
};
const Links: LinksType[] = [
  { url: "/", label: "Search" },
  { url: "/form", label: "Form" },
  { url: "/list", label: "List" },
  { url: "/article", label: "Article" },
  { url: "/signup", label: "SignUp" },
  { url: "/Signin", label: "SignIn" },
];

function MyApp({ Component, pageProps }: AppProps) {
  const [color, setColor] = useState<"dark" | "light">("dark");
  const toggleColorTheme = () => {
    color === "dark" ? setColor("light") : setColor("dark");
  };

  const switchLanguage = (lang: "ja" | "en") => {
    router.push(router.pathname, router.pathname, {
      locale: lang,
    });
  };

  const { t } = useLocale();
  const router = useRouter();

  console.log(router.pathname);
  return (
    <>
      <Head>
        <title>🧠memory with music</title>
        <link rel="icon" href="img/logo_icon_white.png" />
        <meta name="viewport" content="user-scalable=no" />
        <meta name="robots" content="noindex" />
        <meta name="robots" content="nofollow" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0"
        ></meta>
        <meta name="description" content="memory with music" />
        <meta name="keywords" content="HTML,CSS,Tailwind.css"></meta>
        <meta property="og:title" content="" />
        <meta property="og:description" content="memory with music" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="" />
        <meta property="og:image" content="img/brain.png" />
        <meta property="og:site_name" content="memory with music" />
        <meta property="og:locale" content="ja_JP" />
      </Head>

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
                {Links.map((link) => {
                  return (
                    <div key={link.label}>
                      {link.url === router.pathname ? (
                        <Link href={link.url}>
                          <div
                            className={
                              "my-1 rounded-lg  bg-[#0c8599] py-2 pl-2  text-inherit "
                            }
                          >
                            <a>{link.label}</a>
                          </div>
                        </Link>
                      ) : (
                        <Link href={link.url}>
                          <div
                            className={
                              "my-1 rounded-lg  py-2 pl-2 text-inherit  hover:bg-[#273030]"
                            }
                          >
                            <a>{link.label}</a>
                          </div>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </Navbar.Section>
              <Navbar.Section>
                <User />
              </Navbar.Section>
            </Navbar>
          }
          header={
            <Header height={70} p="xs" fixed={true} zIndex={200}>
              <div className="relative flex justify-center ">
                <div className="pr-2 pb-2 text-4xl  font-bold italic hover:not-italic">
                  memory with music
                </div>
                <Loader color="cyan" size="sm" variant="bars" />
                <div className=" absolute right-0 flex">
                  <div>
                    <ActionIcon
                      variant="outline"
                      color={color === "light" ? "yellow" : "blue"}
                      onClick={() => toggleColorTheme()}
                      title="Toggle color scheme"
                      className="m-[6px]"
                    >
                      {color === "light" ? (
                        <Sun size={20} />
                      ) : (
                        <MoonStars size={20} />
                      )}
                    </ActionIcon>
                  </div>
                  <div>
                    <SegmentedControl
                      color="cyan"
                      defaultValue={router.locale}
                      value={router.locale}
                      data={[
                        { value: "ja", label: "ja" },
                        { value: "en", label: "en" },
                      ]}
                      onChange={(lang: "en" | "ja") => switchLanguage(lang)}
                    />
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
