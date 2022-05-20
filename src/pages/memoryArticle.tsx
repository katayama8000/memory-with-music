import { TypographyStylesProvider } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useState } from "react";

const MemoryArticle = () => {
  const router = useRouter();
  const [initial] = useState({
    artist: router.query.artist,
    song: router.query.song,
    image: router.query.image,
    memory: router.query.memory,
  });

  return (
    <div>
      <div>memoryArticle</div>
      <div className="whitespace-pre-wrap">
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: initial.memory }} />
        </TypographyStylesProvider>
      </div>
    </div>
  );
};

export default MemoryArticle;
