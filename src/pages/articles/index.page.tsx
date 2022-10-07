import React from "react";
import { MemoryCard } from "../account/MemoryCard";
import { Grid, LoadingOverlay } from "@mantine/core";
import { useGetAllSongs } from "@hooks/useGetAllSongs";
import { CustomNextPage } from "next";
import { DashboardLayout } from "@pages/Layout";

const Articles: CustomNextPage = () => {
  const { songList, isLoading } = useGetAllSongs();

  return (
    <div>
      <LoadingOverlay
        visible={isLoading}
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

Articles.getLayout = DashboardLayout;
export default Articles;
