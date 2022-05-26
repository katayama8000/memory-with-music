import React, { useState } from "react";
import { useRouter } from "next/router";
import { TypographyStylesProvider } from "@mantine/core";
import { useLocale } from "@hooks/useLocale";

const Article = () => {
  const router = useRouter();
  const { t } = useLocale();
  const [initial] = useState({
    artist: router.query.artist,
    song: router.query.song,
    image: router.query.image,
    memory: router.query.memory,
  });

  return (
    <div className="m-auto max-w-4xl">
      <div className="py-2 text-xl font-extrabold">{t.ARTICLE.TITLE}</div>
      <div className="whitespace-pre-wrap">
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: initial.memory as string }} />
        </TypographyStylesProvider>
      </div>
    </div>
  );
};

export default Article;
