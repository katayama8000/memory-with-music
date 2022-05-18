import "src/lib/tailwind.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>🧠memory with music</title>
      </Head>
      <main className="m-auto max-w-4xl">
        <MantineProvider
          theme={{ colorScheme: "dark", loader: "bars" }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Component {...pageProps} />
        </MantineProvider>
      </main>
    </>
  );
}

export default MyApp;
