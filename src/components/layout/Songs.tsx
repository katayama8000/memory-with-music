import React from "react";
import { useState } from "react";
import type { NextPage } from "next";
import axios from "axios";
import {
  TextInput,
  Button,
  Box,
  Loader,
  Grid,
  Card,
  Image,
} from "@mantine/core";
import { useForm } from "@mantine/form";

type Props = {
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

const getYear = (releaseDate: string) => {
  const date = new Date(releaseDate);
  return date.getFullYear();
};

export const Songs: React.FC<Props> = ({ songsData }) => {
  console.log(songsData);

  return (
    <div>
      {songsData?.resultCount != null ? (
        <div>
          <Grid>
            {songsData?.results?.map((data, index) => {
              return (
                <Grid.Col span={4} key={index}>
                  <div key={index} className="m-auto">
                    <Card shadow="sm" p="lg" radius="md">
                      <Card.Section className="mx-auto py-2">
                        <Image
                          src={data.artworkUrl100}
                          alt={data.artistName}
                          radius="md"
                          height={80}
                        />
                      </Card.Section>

                      <div>{getYear(data.releaseDate)}</div>

                      <Button
                        variant="light"
                        color="cyan"
                        fullWidth
                        radius="md"
                        className="mt-2"
                      >
                        Go to this song
                      </Button>
                    </Card>
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
