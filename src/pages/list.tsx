import React, { useEffect, useState } from "react";
import { config } from "../lib/supabase/supabase";
import { MemoryCard } from "@components/layout/card/MemoryCard";
import { Grid, LoadingOverlay } from "@mantine/core";
import { SongModel } from "@type/song.model";
import { toast } from "@function/toast";
import { useGetAllSongs } from "@hooks/useGetAllSongs";

export const List = () => {
  const { songList, loadingFlag } = useGetAllSongs();

  return (
    <div>
      <LoadingOverlay
        visible={loadingFlag}
        loaderProps={{ size: "lg", color: "cyan", variant: "dots" }}
        overlayOpacity={0.3}
      />
      <div>
        <Grid>
          {songList.map((item) => {
            return (
              <Grid.Col xs={6} key={item.id}>
                <div className="m-auto px-2">
                  <MemoryCard
                    id={item.id}
                    song={item.song}
                    image={item?.image}
                    artist={item.artist}
                    memory={item.memory}
                  />
                </div>
              </Grid.Col>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default List;
