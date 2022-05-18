import type { NextPage } from "next";
import axios from "axios";
import {
  TextInput,
  Button,
  Box,
  Loader,
  Grid,
  Card,
  Image,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

type result = {
  resultCount: number;
  results: {
    artistId: number;
    artistName: string;
    artistViewUrl: string;
    artworkUrl30: string;
    artworkUrl60: string;
    artworkUrl100: string;
    collectionExplicitness: string;
    collectionPrice: number;
    country: string;
    currency: string;
    kind: string;
    previewUrl: string;
    primaryGenreName: string;
    releaseDate: string;
    trackCensoredName: string;
    trackExplicitness: string;
    trackId: number;
    trackName: string;
    trackPrice: number;
    trackTimeMillis: number;
    trackViewUrl: string;
    wrapperType: string;
  }[];
};

const Home: NextPage = () => {
  const [loaderFlag, setLoaderFlag] = useState<boolean>(false);
  const [result, setResult] = useState<result>();

  const form = useForm({
    initialValues: {
      music: "",
    },
  });

  const handleSubmit = async (values: { music: string }) => {
    console.log(values);
    setLoaderFlag(true);
    const { data } = await axios.get(
      `//itunes.apple.com/search?term=${values.music}&country=jp&entity=musicVideo`
    );
    console.log(data);
    setResult(data);
    setLoaderFlag(false);
    console.log(result);
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

      <div className="mt-5">
        {result?.resultCount != 0 ? (
          <div>
            <Grid>
              {result?.results.map((data, index) => {
                return (
                  <Grid.Col span={4} key={index}>
                    <div key={index} className="m-auto">
                      <Card shadow="sm" p="lg" radius="md">
                        <Card.Section className="mx-auto py-2">
                          <Image
                            src={data.artworkUrl100}
                            alt={data.artistName}
                            radius="md"
                            height={80}
                          />
                        </Card.Section>

                        <Button
                          variant="light"
                          color="cyan"
                          fullWidth
                          radius="md"
                          className="mt-2"
                        >
                          Go to this song
                        </Button>
                      </Card>
                    </div>
                  </Grid.Col>
                );
              })}
            </Grid>
          </div>
        ) : (
          <div>There is no such a song</div>
        )}
      </div>
    </div>
  );
};

export default Home;
