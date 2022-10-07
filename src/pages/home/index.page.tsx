/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import type { CustomNextPage, NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { TextInput, Button, Box, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SongList } from "@pages/home/SongList";
import { useLocale } from "@hooks/useLocale";
import { ResultModel } from "@type/result.model";
import { LangModel, CountryModel } from "@type/i18n.model";
import { DashboardLayout } from "@pages/Layout";

let API_lang: LangModel = "en_us";
let API_country: CountryModel = "us";

const Home: CustomNextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [songList, setSongList] = useState<ResultModel>();
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
    async (
      values: { music: string },
      lang: LangModel,
      country: CountryModel
    ): Promise<void> => {
      setIsLoading(true);
      const { data } = await axios.get(
        `//itunes.apple.com/search?term=${values.music}&country=${country}&lang=${lang}&media=music&limit=51&offset=0`
      );
      setSongList(data);
      setIsLoading(false);
    },
    [songList, isLoading]
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
        visible={isLoading}
        loaderProps={{ size: "lg", color: "cyan", variant: "dots" }}
        overlayOpacity={0.3}
      />
      <div className="mt-5">
        <SongList songList={songList!} loading={isLoading} />
      </div>
    </div>
  );
};

Home.getLayout = DashboardLayout;
export default Home;