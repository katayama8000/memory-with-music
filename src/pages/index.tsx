import type { NextPage } from "next";
import { TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";

const Home: NextPage = () => {
  const form = useForm({
    initialValues: {
      music: "",
    },
  });

  const handleSubmit = async (values) => {
    console.log(values);
    const { data } = await axios.get(
      `//itunes.apple.com/search?term=${values}&country=jp&entity=musicVideo`
    );
    console.log(data);
  };

  return (
    <div className="p-20">
      <h1 className="text-center italic hover:not-italic">memory with music</h1>
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
