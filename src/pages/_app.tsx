import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import "src/lib/tailwind.css";
import { MantineProvider, ActionIcon, SegmentedControl } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Sun, MoonStars } from "tabler-icons-react";
import { Title } from "@components/layout/header/Title";

function MyApp({ Component, pageProps }: AppProps) {
  const [color, setColor] = useState<"dark" | "light">("dark");
  const router = useRouter();
  const toggleColorTheme = () => {
    color === "dark" ? setColor("light") : setColor("dark");
  };
  const switchLanguage = (lang: "ja" | "en") => {
    router.push(router.pathname, router.pathname, {
      locale: lang,
    });
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
        <meta property="og:image" content="img/rain.png" />
        <meta property="og:site_name" content="memory with music" />
        <meta property="og:locale" content="ja_JP" />
      </Head>
      <main className="m-auto max-w-4xl">
        <Title />
        {/* 開発中は便利なので残しておく */}
        <div className="flex justify-end">
          <Link href="/">
            <a className="text-inherit no-underline">home/ </a>
          </Link>
          <Link href="/supa">
            <a className="text-inherit no-underline">supa/ </a>
          </Link>
          <Link href="/memories">
            <a className="text-inherit no-underline">memories/ </a>
          </Link>
          <Link href="/memoryArticle">
            <a className="text-inherit no-underline">Article/ </a>
          </Link>
          <ActionIcon
            variant="outline"
            color={color === "light" ? "yellow" : "blue"}
            onClick={() => toggleColorTheme()}
            title="Toggle color scheme"
          >
            {color === "light" ? <Sun size={18} /> : <MoonStars size={18} />}
          </ActionIcon>
        </div>
        <MantineProvider
          theme={{ colorScheme: color }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider position="bottom-right" zIndex={2077}>
            <div className="flex justify-end">
              <SegmentedControl
                data={[
                  { value: "ja", label: "ja" },
                  { value: "en", label: "en" },
                ]}
                onChange={(lang: "en" | "ja") => switchLanguage(lang)}
              />
            </div>
            <Component {...pageProps} />
          </NotificationsProvider>
        </MantineProvider>
      </main>
    </>
  );
}

export default MyApp;
