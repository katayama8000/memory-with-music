import React, { FC } from "react";
import Head from "next/head";

export const HeadContents: FC = () => {
  return (
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
  );
};
