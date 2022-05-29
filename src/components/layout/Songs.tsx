import React from "react";
import { Grid } from "@mantine/core";
import { SongCard, SkeletonCard } from "@components/layout/card/Song";
import { useLocale } from "@hooks/useLocale";
import { result } from "@type/typeResult";

type Props = {
  loading: boolean;
  songsData: result;
};

export const Songs: React.FC<Props> = ({ songsData, loading }) => {
  const { t } = useLocale();
  return (
    <div>
      {songsData?.resultCount !== 0 ? (
        <div>
          <Grid>
            {loading && (
              <Grid.Col xs={6} sm={4} className="mx-1 sm:mx-0">
                <div className="m-auto">
                  <SkeletonCard />
                </div>
              </Grid.Col>
            )}
            {songsData?.results?.map((data, index) => {
              return (
                <Grid.Col xs={6} sm={4} key={index}>
                  <div key={index} className="px-1 sm:mx-0">
                    <SongCard
                      url={data.artworkUrl100}
                      artistName={data.artistName}
                      trackName={data.trackName}
                      releaseDate={data.releaseDate}
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
