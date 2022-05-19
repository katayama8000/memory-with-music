import { NextPage } from "next";
import React, { useState } from "react";
import { config } from "../lib/supabase/supabase";
import { TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Notification } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
const Supa: NextPage = () => {
  const [data, setData] = useState([]);
  const form = useForm({
    initialValues: {
      song: "",
    },
  });
  const fetch = async () => {
    const { data } = await config.supabase.from("songs").select();

    console.log(data);
    setData(data);
  };

  const insert = async (values: { song: string }) => {
    const { data, error } = await config.supabase.from("songs").insert([
      {
        song: values.song,
      },
    ]);
    showNotification({
      title: "Success",
      message: "Your memories have been saved with music 🤥",
      color: "cyan",
    });
  };
  return (
    <div className="flex flex-col justify-center">
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) => insert(values))}
          className="mt-2 flex gap-x-2"
        >
          <TextInput
            required
            placeholder="song"
            {...form.getInputProps("song")}
          />
          <Button type="submit" color="cyan">
            Submit
          </Button>
        </form>
      </Box>
      <div onClick={fetch}>fetch</div>
      <div>
        {data.map((a, index) => {
          return <div key={index}>{a.song}</div>;
        })}
      </div>
      <Group position="center">
        <Button
          variant="outline"
          onClick={() =>
            showNotification({
              title: "Default notification",
              message: "Hey there, your code is awesome! 🤥",
              color: "cyan",
            })
          }
        >
          Show customized notification
        </Button>
      </Group>
    </div>
  );
};

export default Supa;
