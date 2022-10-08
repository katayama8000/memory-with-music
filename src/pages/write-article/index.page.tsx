/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CustomNextPage, NextPage } from "next";
import { useRouter } from "next/router";
import { TextInput, Button, Textarea, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { supabase } from "../../lib/supabase/supabase";
import { useLocale } from "@hooks/useLocale";
import { toast } from "@function/toast";
import type { SongModel } from "@type/song.model";
import { DashboardLayout } from "@pages/Layout";
import { useGetUserId } from "@hooks/useGetUserId";

type initType = {
  artist: string;
  song: string;
  image: string;
  memory: string;
  isEdit: string;
};

const WriteArticle: CustomNextPage = () => {
  const userID = useGetUserId();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useLocale();
  const [initForm, setInitForm] = useState<initType>({
    artist: "",
    song: "",
    image: "",
    memory: "",
    isEdit: "",
  });

  const form = useForm({
    initialValues: {
      artist: "",
      song: "",
      image: "",
      memory: "",
    },
  });

  useEffect(() => {
    if (router.isReady) {
      if (
        typeof router.query.artist === "string" &&
        typeof router.query.song === "string" &&
        typeof router.query.image === "string" &&
        typeof router.query.isEdit === "string"
      ) {
        setInitForm({
          artist: router.query.artist,
          song: router.query.song,
          image: router.query.image,
          memory: "",
          isEdit: router.query.isEdit,
        });
      }
    }
  }, [router]);

  useEffect(() => {
    form.setValues({
      artist: initForm.artist,
      song: initForm.song,
      image: initForm.image,
      memory: initForm.memory,
    });
  }, [initForm]);

  const handleAddArticle = async (values: {
    artist: string | string[] | undefined;
    song: string | string[] | undefined;
    memory: string | string[] | undefined;
    image: string | string[] | undefined;
  }): Promise<void> => {
    setIsLoading(true);

    const { data, error } = await supabase.from("songs").insert([
      {
        artist: values.artist,
        song: values.song,
        memory: values.memory,
        image: values.image,
        userId: userID,
      },
    ]);

    if (data) {
      toast(t.NOTIFICATION.SUCCESS, t.NOTIFICATION.MESSAGE, "cyan");
      setTimeout(() => {
        router.push("/articles");
      }, 1000);
    }
    if (error) {
      toast(t.NOTIFICATION.ERROR, error.message, "red");
    }
    setIsLoading(false);
  };

  const handleUpDateArticle = async (values: {
    artist: string;
    song: string;
    memory: string;
  }) => {
    const { data, error } = await supabase
      .from<SongModel>("songs")
      .update({ memory: values.memory })
      .match({
        artist: values.artist,
        song: values.song,
        userId: userID,
      });

    if (data) {
      toast(t.NOTIFICATION.SUCCESS, t.NOTIFICATION.MESSAGE, "cyan");
      setTimeout(() => {
        router.push("/articles");
      }, 1000);
    }

    if (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (values: {
    artist: string;
    song: string;
    memory: string;
    image: string;
  }) => {
    initForm.isEdit === "true"
      ? handleUpDateArticle(values)
      : handleAddArticle(values);
  };

  return (
    <div className="flex flex-col justify-center px-2">
      <Group position="right" mt="md">
        {initForm.isEdit == "true" && (
          <Button color="pink" onClick={() => console.log(initForm.isEdit)}>
            {t.FORM.EDIT}
          </Button>
        )}
      </Group>
      <form
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
        className="mt-2"
      >
        <TextInput
          required
          placeholder={t.FORM.ARTIST}
          {...form.getInputProps("artist")}
          className="mt-2"
        />
        <TextInput
          required
          placeholder={t.FORM.SONG}
          {...form.getInputProps("song")}
          className="mt-2"
        />
        <TextInput
          placeholder={t.FORM.IMAGE}
          {...form.getInputProps("image")}
          className="mt-2"
        />
        <Textarea
          placeholder={t.FORM.YOURMEMORY}
          required
          autosize
          minRows={10}
          maxRows={13}
          {...form.getInputProps("memory")}
          className="mt-2"
        />
        <Group position="right" mt="md">
          <Button
            color="cyan"
            className="mt-2"
            type="submit"
            loading={isLoading}
          >
            {t.POST}
          </Button>
        </Group>
      </form>
    </div>
  );
};

WriteArticle.getLayout = DashboardLayout;
export default WriteArticle;
