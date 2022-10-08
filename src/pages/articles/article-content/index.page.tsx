/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Tooltip, TypographyStylesProvider } from "@mantine/core";
import { useLocale } from "@hooks/useLocale";
import { supabase } from "src/lib/supabase/supabase";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { toast } from "@function/toast";
import { DeleteArticleModal } from "./DeleteArticleModal";
import Link from "next/link";
import { CustomNextPage } from "next";
import { SongModel } from "@type/song.model";
import { DashboardLayout } from "@pages/Layout";
import { useGetUserId } from "@hooks/useGetUserId";
import { UserModel } from "@type/user.model";

const Article: CustomNextPage = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [userIdRelatedArticle, setUserIdRelatedArticle] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const router = useRouter();
  const userId = useGetUserId();
  const [isMyArticle, setIsMyArticle] = useState<boolean>(false);
  const [initArticle, setInitArticle] = useState({
    id: 0,
    artist: "",
    song: "",
    image: "",
    memory: "",
  });

  const compareUserIdRelatedToArticle = useCallback(async () => {
    const { data, error } = await supabase
      .from<SongModel>("songs")
      .select("userId")
      .match({ id: router.query.id });

    if (data) {
      if (data[0].userId === userId) {
        console.log("true");
        setIsMyArticle(true);
        console.log("isMyArticle", data[0].userId);
      } else {
        setIsMyArticle(false);
      }
      setUserIdRelatedArticle(data[0].userId!);
    }

    if (error) {
      toast("error", error.message, "red");
    }
  }, [router.query.id, userId]);

  const getUserNameRelatedToArticle = useCallback(async () => {
    const { data, error } = await supabase

      .from<UserModel>("users")
      .select("userName")
      .match({ userId: userIdRelatedArticle });

    if (data) {
      console.log(data, "katayama", userIdRelatedArticle);
      setUserName(data[0]?.userName);
    }

    if (error) {
      toast("error", error.message, "red");
    }
  }, [userIdRelatedArticle]);

  useEffect(() => {
    getUserNameRelatedToArticle();
  }, [userIdRelatedArticle]);

  useEffect(() => {
    if (router.isReady) {
      if (
        typeof router.query.id === "string" &&
        typeof router.query.artist === "string" &&
        typeof router.query.song === "string" &&
        typeof router.query.image === "string" &&
        typeof router.query.memory === "string"
      ) {
        setInitArticle({
          id: router.query.id as unknown as number,
          artist: router.query.artist,
          song: router.query.song,
          image: router.query.image,
          memory: router.query.memory,
        });
      }
      compareUserIdRelatedToArticle();
    }
  }, [router]);

  const handleDelete = useCallback(async (): Promise<void> => {
    const { data, error } = await supabase
      .from<SongModel>("songs")
      .delete()
      .match({ id: router.query.id });

    if (data) {
      toast("成功", "削除しました", "cyan");
      router.push("/articles");
    }
    if (error) {
      toast("error", error.message, "red");
    }
    setOpened(false);
  }, [router]);

  return (
    <div className="m-auto max-w-4xl px-2">
      <div className="flex justify-between py-4">
        <div className="truncate text-3xl font-extrabold">
          {initArticle.song}/{initArticle.artist}
        </div>
        <div>
          {isMyArticle && (
            <div className="flex px-4">
              <div className="mx-1">
                <Tooltip withArrow label="Delete this Article">
                  <RiDeleteBin6Line
                    className="h-8 w-8 "
                    onClick={() => setOpened(true)}
                  />
                </Tooltip>
              </div>
              <Link
                href={{
                  pathname: "/write-article",
                  query: {
                    id: initArticle.id,
                    artist: initArticle.artist,
                    song: initArticle.song,
                    image: initArticle.image,
                    memory: initArticle.memory,
                    isEdit: true,
                  },
                }}
              >
                <a className="text-inherit">
                  <div className="mx-1">
                    <Tooltip withArrow label="Edit this Article">
                      <FiEdit className="h-8 w-8 " />
                    </Tooltip>
                  </div>
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div>written by : {userName}</div>
      <div className="mt-10 whitespace-pre-wrap">
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: initArticle.memory }} />
        </TypographyStylesProvider>
      </div>
      <DeleteArticleModal
        opened={opened}
        setOpened={setOpened}
        handleDelete={handleDelete}
      />
    </div>
  );
};

Article.getLayout = DashboardLayout;
export default Article;
