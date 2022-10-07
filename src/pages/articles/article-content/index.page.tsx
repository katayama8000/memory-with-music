/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Group, Modal, Tooltip, TypographyStylesProvider } from "@mantine/core";
import { useLocale } from "@hooks/useLocale";
import { supabase } from "src/lib/supabase/supabase";
import { snapshot } from "valtio";
import { state } from "@state/state";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { toast } from "@function/toast";
import { DeleteArticleModal } from "./DeleteArticleModal";
import Link from "next/link";
import { useGetUserName } from "@hooks/useGetUserName";
import { CustomNextPage, NextPage } from "next";
import { SongModel } from "@type/song.model";
import { DashboardLayout } from "@pages/Layout";

const Article: CustomNextPage = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const router = useRouter();
  const snap = snapshot(state);
  const { userName } = useGetUserName();
  const [initArticle, setInitArticle] = useState({
    id: 0,
    artist: "",
    song: "",
    image: "",
    memory: "",
  });

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
    }
  }, [router]);

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from<SongModel>("songs")
      .delete()
      .match({ id: router.query.id });

    console.log("delete", data, error);
    if (data) {
      toast("成功", "削除しました", "cyan");
      router.push("/list");
    }
    if (error) {
      toast("error", error.message, "red");
    }
    setOpened(false);
  };
  return (
    <div className="m-auto max-w-4xl px-2">
      <div className="flex justify-between py-4">
        <div className="truncate text-3xl font-extrabold">
          {initArticle.song}/{initArticle.artist}
        </div>
        <div>
          {userName === snap.userName && (
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
                  pathname: "/form",
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
