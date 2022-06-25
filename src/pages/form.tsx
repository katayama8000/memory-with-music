/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { TextInput, Button, Textarea, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { config } from "../lib/supabase/supabase";
import { useLocale } from "@hooks/useLocale";
import { toast } from "@function/toast";
import { state, saveUserId, saveUserEmail, saveUserName } from "@state/state";
import { useSnapshot } from "valtio";

const Form: NextPage = () => {
  const snap = useSnapshot(state);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useLocale();
  const [initial] = useState({
    artist: router.query.artist,
    song: router.query.song,
    image: router.query.image,
  });

  const form = useForm({
    initialValues: {
      artist: initial.artist,
      song: initial.song,
      image: initial.image,
      memory: "",
    },
  });

  const insert = async (values: {
    artist: string | string[] | undefined;
    song: string | string[] | undefined;
    memory: string | string[] | undefined;
    image: string | string[] | undefined;
  }) => {
    setLoading(true);

    const { data, error } = await config.supabase.from("songs").insert([
      {
        artist: values.artist,
        song: values.song,
        memory: values.memory,
        image: values.image,
        userId: snap.userId,
      },
    ]);

    if (data) {
      toast(t.NOTIFICATION.SUCCESS, t.NOTIFICATION.MESSAGE, "cyan");
      //form.reset();
      setTimeout(() => {
        router.push("/list");
      }, 1000);
    }
    if (error) {
      toast(t.NOTIFICATION.ERROR, error.message, "red");
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col justify-center px-2">
      <form
        onSubmit={form.onSubmit((values) => insert(values))}
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
          <Button color="cyan" className="mt-2" type="submit" loading={loading}>
            {t.POST}
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default Form;
