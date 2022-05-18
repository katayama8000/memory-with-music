import type { NextPage } from "next";
import axios from "axios";
import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Loader,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

const Home: NextPage = () => {
  const [loaderFlag, setLoaderFlag] = useState<boolean>(false);
  const form = useForm({
    initialValues: {
      music: "",
    },
  });

  const handleSubmit = async (values: { music: string }) => {
    console.log(values);
    setLoaderFlag(true);
    const { data } = await axios.get(
      `//itunes.apple.com/search?term=${values}&country=jp&entity=musicVideo`
    );
    console.log(data);
    setLoaderFlag(false);
  };

  return (
    <div className="p-20">
      {loaderFlag && <Loader color="cyan" size="xl" />}

      <div className="flex justify-center">
        <h1 className="pr-2 pb-2 text-center italic hover:not-italic">
          memory with music
        </h1>
        <Loader color="cyan" size="sm" />
      </div>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
          className="mt-2 flex gap-x-2"
        >
          <TextInput
            placeholder="searching for music"
            {...form.getInputProps("music")}
          />
          <Button type="submit" color="cyan">
            Serarch
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Home;
