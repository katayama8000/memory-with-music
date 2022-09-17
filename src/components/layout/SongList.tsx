import React from "react";
import { Grid } from "@mantine/core";
import { SongCard } from "@components/layout/card/SongCard";
import { SkeletonCard } from "@components/layout/card/SkeletonCard";
import { useLocale } from "@hooks/useLocale";
import { result } from "@type/typeResult.model";

type Props = {
  loading: boolean;
  songList: result;
};

export const SongList: React.FC<Props> = ({ songList, loading }) => {
  const { t } = useLocale();
  return (
    <div>
      {songList?.resultCount !== 0 ? (
        <div>
          <Grid>
            {loading && (
              <Grid.Col xs={6} sm={4} className="mx-1 sm:mx-0">
                <div className="m-auto">
                  <SkeletonCard />
                </div>
              </Grid.Col>
            )}
            {songList?.results?.map((song, index) => {
              return (
                <Grid.Col xs={6} sm={4} key={index}>
                  <div className="px-1 sm:mx-0">
                    <SongCard
                      url={song.artworkUrl100}
                      artistName={song.artistName}
                      trackName={song.trackName}
                      releaseDate={song.releaseDate}
                      loading={loading}
                    />
                  </div>
                </Grid.Col>
              );
            })}
          </Grid>
        </div>
      ) : (
        <div className="pt-10 text-center text-xl font-bold">{t.NOSONG}</div>
      )}
    </div>
  );
};
