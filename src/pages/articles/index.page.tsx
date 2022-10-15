import React from "react";
import { MemoryCard, SkeletonCard } from "@components/Memory/MemoryCard";
import { Grid } from "@mantine/core";
import { CustomNextPage } from "next";
import { DashboardLayout } from "@pages/Layout";
import { useGetArticles } from "@hooks/useGetArticles";

const NUMBER_OF_SKELETONS = Array.from(Array(20).keys());

const Articles: CustomNextPage = () => {
  const { articles, isLoading, isError } = useGetArticles();

  return (
    <div>
      <div className="m-auto max-w-7xl ">
        <Grid>
          {isLoading
            ? NUMBER_OF_SKELETONS.map((item) => {
                return (
                  <Grid.Col xs={6} className="mx-1 sm:mx-0" key={item}>
                    <div className="px-1 sm:mx-0">
                      <SkeletonCard />
                    </div>
                  </Grid.Col>
                );
              })
            : articles?.map((item) => {
                return (
                  <Grid.Col xs={6} className="mx-1 sm:mx-0" key={item.id}>
                    <div className="px-1">
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
