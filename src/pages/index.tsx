/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { TextInput, Button, Box, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SongList } from "@components/layout/SongList";
import { useLocale } from "@hooks/useLocale";
import { result } from "@type/typeResult";
import { lang, country } from "@type/typeI18n";

let API_lang: lang = "en_us";
let API_country: country = "us";

const Home: NextPage = () => {
  const [loadingFlag, setLoadingFlag] = useState<boolean>(false);
  const [songList, setSongList] = useState<result>();
  const router = useRouter();

  const { t } = useLocale();

  const form = useForm({
    initialValues: {
      music: "",
    },
  });

  if (router.locale === "ja") {
    API_lang = "ja_jp";
    API_country = "jp";
  }

  const handleSubmit = useCallback(
    async (values: { music: string }, lang: lang, country: country) => {
      setLoadingFlag(true);
      const { data } = await axios.get(
        `//itunes.apple.com/search?term=${values.music}&country=${country}&lang=${lang}&media=music&limit=51&offset=0`
      );
      console.log(data);
      setSongList(data);
      setLoadingFlag(false);
    },
    [songList, loadingFlag]
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
          <TextInput
            placeholder={t.SEARCH}
            classNames={{
              input: "text-base",
            }}
            {...form.getInputProps("music")}
          />
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
        <SongList songList={songList!} loading={loadingFlag} />
        {/* <Button color="cyan" className="m-5">
          show more
        </Button> */}
      </div>
    </div>
  );
};

export default Home;
