import { ReactElement, useEffect, useState } from "react";
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
import { FaSearch } from "react-icons/fa";
import { AiOutlineForm } from "react-icons/ai";
import { FaRegListAlt } from "react-icons/Fa";
import { MdArticle } from "react-icons/Md";
import { BiLogIn } from "react-icons/Bi";
import { MdManageAccounts } from "react-icons/Md";

type LinksType = {
  url: string;
  label: string;
  icon: ReactElement;
};
const Links: LinksType[] = [
  { url: "/", label: "Search", icon: <FaSearch /> },
  { url: "/form", label: "Form", icon: <AiOutlineForm /> },
  { url: "/list", label: "List", icon: <FaRegListAlt /> },
  { url: "/article", label: "Article", icon: <MdArticle /> },
  { url: "/signup", label: "SignUp", icon: <BiLogIn /> },
  { url: "/signin", label: "SignIn", icon: <BiLogIn /> },
  { url: "/account", label: "Account", icon: <MdManageAccounts /> },
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

  const colorSet = (url: string, pathname: string): string => {
    let color: string = "";
    if (url === pathname) {
      color = "#0c8599";
    } else {
      color = "#273030";
    }
    return color;
  };

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
                    <Link href={link.url} key={link.label}>
                      <div
                        className={`bg-[${colorSet(
                          link.url,
                          router.pathname
                        )}] my-1 flex rounded-lg py-2 pl-2  text-inherit hover:bg-[${colorSet(
                          link.url,
                          router.pathname
                        )}]`}
                      >
                        <span className="mt-[2px] pr-2">{link.icon}</span>
                        <a className="text-lg">{link.label}</a>
                      </div>
                    </Link>
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
