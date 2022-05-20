import { useCallback, useState } from "react";
import type { NextPage } from "next";
import axios from "axios";
import { TextInput, Button, Box, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Songs } from "@components/layout/Songs";

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
  const [loadingFlag, setLoadingFlag] = useState<boolean>(false);
  const [songsData, setSongsData] = useState<result>();

  const form = useForm({
    initialValues: {
      music: "",
    },
  });

  const handleSubmit = useCallback(async (values: { music: string }) => {
    setLoadingFlag(true);
    const { data } = await axios.get(
      `//itunes.apple.com/search?term=${values.music}&country=jp&entity=musicVideo`
    );
    setSongsData(data);
    setLoadingFlag(false);
    form.reset();
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
          className="mt-2 flex gap-x-2"
        >
          <TextInput
            placeholder="search for music"
            {...form.getInputProps("music")}
          />
          <Button type="submit" color="cyan">
            Serarch
          </Button>
        </form>
      </Box>
      <LoadingOverlay
        visible={loadingFlag}
        loaderProps={{ size: "lg", color: "cyan", variant: "dots" }}
        overlayOpacity={0.3}
      />
      <div className="mt-5">
        <Songs songsData={songsData} loading={loadingFlag} />
      </div>
    </div>
  );
};

export default Home;
