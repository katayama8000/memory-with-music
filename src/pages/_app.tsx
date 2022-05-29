import { useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import "src/lib/tailwind.css";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Header } from "@components/layout/header/Header";

function MyApp({ Component, pageProps }: AppProps) {
  const [color, setColor] = useState<"dark" | "light">("dark");
  const toggleColorTheme = () => {
    color === "dark" ? setColor("light") : setColor("dark");
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
      <main className="m-auto max-w-4xl">
        <MantineProvider
          theme={{
            colorScheme: color,
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider position="bottom-right" zIndex={2077}>
            <Header onClick={() => toggleColorTheme()} color={color} />
            <Component {...pageProps} />
          </NotificationsProvider>
        </MantineProvider>
      </main>
    </>
  );
}

export default MyApp;
