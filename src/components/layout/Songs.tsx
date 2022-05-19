import React from "react";
import { Grid } from "@mantine/core";
import { SongCard, SkeletonCard } from "@components/layout/card/Song";

type Props = {
  loading: boolean;
  songsData: {
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
};

export const Songs: React.FC<Props> = ({ songsData, loading }) => {
  console.log(songsData);

  return (
    <div>
      {songsData?.resultCount > 0 ? (
        <div>
          <Grid>
            {loading && (
              <Grid.Col span={4}>
                <div className="m-auto">
                  <SkeletonCard />
                </div>
              </Grid.Col>
            )}
            {songsData?.results?.map((data, index) => {
              return (
                <Grid.Col span={4} key={index}>
                  <div key={index} className="m-auto">
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
        <div className="pt-10 text-center text-xl font-bold">
          There is no such a song
        </div>
      )}
    </div>
  );
};
