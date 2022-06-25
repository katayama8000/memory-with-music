import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TypographyStylesProvider } from "@mantine/core";
import { useLocale } from "@hooks/useLocale";
import { config } from "src/lib/supabase/supabase";

const Article = () => {
  const [userName, setUserName] = useState<string>("");
  const router = useRouter();
  const { t } = useLocale();
  const [initial] = useState({
    id: router.query.id,
    artist: router.query.artist,
    song: router.query.song,
    image: router.query.image,
    memory: router.query.memory,
  });

  const getUserId = async () => {
    const { data, error } = await config.supabase
      .from("songs")
      .select("userId")
      .match({ id: router.query.id });

    if (data) {
      console.log(data, error);
      const userId = data![0].userId;
      console.log(typeof userId);
      getUserName(userId);
    }

    if (error) {
      console.log(error);
    }
  };

  const getUserName = async (userId: string) => {
    const { data, error } = await config.supabase
      .from("users")
      .select("userName")
      .match({ userId: userId });

    console.log(data, error);
    const userName = data![0].userName;
    console.log(userName);
    setUserName(userName);
  };

  getUserId();

  return (
    <div className="m-auto max-w-4xl px-2">
      <button
        onClick={() => {
          getUserId();
        }}
      >
        get
      </button>
      <div className="py-2 text-xl font-extrabold">{t.ARTICLE.TITLE}</div>
      <div>written by : {userName}</div>
      <div className="whitespace-pre-wrap">
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: initial.memory as string }} />
        </TypographyStylesProvider>
      </div>
    </div>
  );
};

export default Article;
