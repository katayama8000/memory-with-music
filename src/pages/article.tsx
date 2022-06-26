/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Group, Modal, TypographyStylesProvider } from "@mantine/core";
import { useLocale } from "@hooks/useLocale";
import { config } from "src/lib/supabase/supabase";
import { snapshot } from "valtio";
import { state } from "@state/state";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Button } from "src/lib/mantine";
import { toast } from "@function/toast";

const Article = () => {
  const [userName, setUserName] = useState<string>("");
  const [opened, setOpened] = useState<boolean>(false);
  const router = useRouter();
  const { t } = useLocale();
  const snap = snapshot(state);
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

  // useEffect(() => {
  //   setInitArticle({
  //     id: router.query.id,
  //     artist: router.query.artist,
  //     song: router.query.song,
  //     image: router.query.image,
  //     memory: router.query.memory,
  //   });
  // }, [initArticle]);

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

  useEffect(() => {
    if (router.isReady) {
      getUserId();
    }
  }, [router]);

  const handleDelete = async () => {
    console.log("delete");
    const { data, error } = await config.supabase
      .from("songs")
      .delete()
      .match({ id: router.query.id });

    console.log(data, error);
    if (data) {
      router.push("/");
    }
    if (error) {
      toast("error", error.message, "red");
    }
    setOpened(false);
  };
  return (
    <div className="m-auto max-w-4xl px-2">
      <div className="flex justify-between">
        <div className="py-2 text-xl font-extrabold">{t.ARTICLE.TITLE}</div>
        <div>written by : {userName}</div>
      </div>
      {userName === snap.userName ? (
        <div>
          <RiDeleteBin6Line
            className="h-6 w-6"
            onClick={() => setOpened(true)}
          />
          <FiEdit />
        </div>
      ) : (
        <div>nooooooo</div>
      )}
      <div className="whitespace-pre-wrap">
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: initArticle.memory }} />
        </TypographyStylesProvider>
      </div>
      <Modal opened={opened} onClose={() => setOpened(false)} size={500}>
        <Group position="center">
          <div className="text-xl font-bold">
            Are you sure you want to delete this article?
          </div>
          <Button
            color="red"
            className="m-3 w-20"
            onClick={() => handleDelete()}
          >
            delete
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default Article;
