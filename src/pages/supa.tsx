import { NextPage } from "next";
import React, { useState } from "react";
import { TextInput, Button, Box, Textarea, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { config } from "../lib/supabase/supabase";
import { useRouter } from "next/router";

const Supa: NextPage = () => {
  const router = useRouter();
  const [initial, setInitial] = useState({
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
        title: "Success",
        message: "Inserted",
        color: "cyan",
      });
    }
    if (error) {
      showNotification({
        title: "Error",
        message: error.message,
        color: "red",
      });
    }
  };
  return (
    <div className="flex flex-col justify-center">
      <form
        onSubmit={form.onSubmit((values) => insert(values))}
        className="mt-2"
      >
        <TextInput
          required
          description="Song"
          placeholder="artist"
          {...form.getInputProps("artist")}
          className="mt-2"
        />
        <TextInput
          required
          placeholder="song"
          {...form.getInputProps("song")}
          className="mt-2"
        />
        <TextInput
          placeholder="image"
          {...form.getInputProps("image")}
          className="mt-2"
        />
        <Textarea
          placeholder="Your memory"
          required
          autosize
          minRows={10}
          maxRows={13}
          {...form.getInputProps("memory")}
          className="mt-2"
        />

        <Group position="right" mt="md">
          <Button type="submit" color="cyan" className="mt-2">
            Save your memory
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default Supa;
