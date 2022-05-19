import { NextPage } from "next";
import React, { useState } from "react";
import { config } from "../lib/supabase/supabase";
import { TextInput, Button, Box, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

const Supa: NextPage = () => {
  const [data, setData] = useState([]);
  const form = useForm({
    initialValues: {
      song: "",
      artist: "",
      memory: "",
      image: "",
    },
  });
  const fetch = async () => {
    const { data } = await config.supabase.from("songs").select();

    console.log(data);
    setData(data);
  };

  const insert = async (values: {
    artist: string;
    song: string;
    memory: string;
    image: string;
  }) => {
    const { data, error } = await config.supabase.from("songs").insert([
      {
        song: values.song,
        artist: values.artist,
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
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) => insert(values))}
          className="mt-2"
        >
          <TextInput
            required
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
            required
            placeholder="image"
            {...form.getInputProps("image")}
            className="mt-2"
          />
          <Textarea
            placeholder="Your memory"
            required
            {...form.getInputProps("memory")}
            className="mt-2"
          />
          <Button type="submit" color="cyan" className="mt-2">
            Save your memory
          </Button>
        </form>
      </Box>
      <div onClick={fetch}>fetch</div>
      <div>
        {data.map((a, index) => {
          return <div key={index}>{a.song}</div>;
        })}
      </div>
    </div>
  );
};

export default Supa;
