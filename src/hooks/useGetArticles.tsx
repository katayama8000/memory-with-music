import { SongModel } from "@type/article.model";
import useSWR from "swr";

const fetcher = async (args: string) => {
  const ret = await fetch(args);
  return ret.json();
};
export const useApi = () => {
  const { data, error } = useSWR<SongModel[]>("./api/articles", fetcher);
  return {
    articles: data,
    isLoading: !error && !data,
    isError: error,
  };
};
