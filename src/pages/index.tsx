/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
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
  const router = useRouter();

  let API_lang: "ja_jp" | "en_us" = "en_us";
  let API_country: "jp" | "us" = "us";
  if (router.locale === "ja") {
    API_lang = "ja_jp";
    API_country = "jp";
  }

  const { t } = useLocale();

  const form = useForm({
    initialValues: {
      music: "",
    },
  });

  const handleSubmit = useCallback(
    async (
      values: { music: string },
      lang: "ja_jp" | "en_us",
      country: "jp" | "us"
    ) => {
      setLoadingFlag(true);
      const { data } = await axios.get(
        `//itunes.apple.com/search?term=${values.music}&country=${country}&lang=${lang}&media=music&limit=40&offset=0`
      );
      console.log(data);
      setSongsData(data);
      setLoadingFlag(false);
    },
    []
  );

  return (
    <div className="flex flex-col justify-center">
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) =>
            handleSubmit(values, API_lang, API_country)
          )}
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
        <Button color="cyan" className="m-5">
          show more
        </Button>
      </div>
    </div>
  );
};

export default Home;
