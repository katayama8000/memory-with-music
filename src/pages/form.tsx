import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { TextInput, Button, Textarea, Group, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { config } from "../lib/supabase/supabase";
import { useLocale } from "@hooks/useLocale";

const Form: NextPage = () => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
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
    const { data, error } = await config.supabase.from("songs").insert([
      {
        artist: values.artist,
        song: values.song,
        memory: values.memory,
        image: values.image,
      },
    ]);

    form.reset();

    if (data) {
      showNotification({
        title: t.Notification.SUCCESS,
        message: t.Notification.MESSAGE,
        color: "cyan",
      });
      router.push("/list");
    }
    if (error) {
      showNotification({
        title: t.Notification.ERROR,
        message: error.message,
        color: "red",
      });
    }
    setOpened(false);
  };
  return (
    <div className="flex flex-col justify-center">
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

        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          centered={true}
          withCloseButton={false}
        >
          <div className="p-2 text-center text-xl font-bold">
            You can not edit this article,
            <br />
            Do you save your memory?
          </div>
          <Group position="center" mt="md">
            <Button
              className="mt-2"
              onClick={form.onSubmit((values) => insert(values))}
            >
              Yes
            </Button>
            <Button
              color="red"
              className="mt-2"
              onClick={() => setOpened(false)}
            >
              No
            </Button>
          </Group>
        </Modal>

        <Group position="right" mt="md">
          <Button color="cyan" className="mt-2" type="submit">
            {t.SAVE}
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default Form;
