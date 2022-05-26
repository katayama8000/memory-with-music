/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import type { NextPage } from "next";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { TextInput, Button, Box, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Songs } from "@components/layout/Songs";
import { useLocale } from "@hooks/useLocale";
import { result } from "@type/typeResult";

const Home: NextPage = () => {
  const [loadingFlag, setLoadingFlag] = useState<boolean>(false);
  const [songsData, setSongsData] = useState<result>();

  const { t } = useLocale();

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
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
          className="mt-2 flex gap-x-2"
        >
          <TextInput placeholder={t.SEARCH} {...form.getInputProps("music")} />
          <Button type="submit" color="cyan">
            <FaSearch />
          </Button>
        </form>
      </Box>
      <LoadingOverlay
        visible={loadingFlag}
        loaderProps={{ size: "lg", color: "cyan", variant: "dots" }}
        overlayOpacity={0.3}
      />
      <div className="mt-5">
        <Songs songsData={songsData!} loading={loadingFlag} />
      </div>
    </div>
  );
};

export default Home;
