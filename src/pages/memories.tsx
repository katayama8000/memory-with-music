import React, { useEffect, useState } from "react";
import { config } from "../lib/supabase/supabase";
import { Memory } from "@components/layout/card/Memory";
import { showNotification } from "@mantine/notifications";
import { Card, Image, Grid, Text, LoadingOverlay } from "@mantine/core";

type Props = {
  id: number;
  created_at: string;
  song: string;
  image: string;
  artist: string;
  memory: string;
};

export const Memories = () => {
  const [data, setData] = useState<Props[]>([]);
  const [loadingFlag, setLoadingFlag] = useState<boolean>(false);
  useEffect(() => {
    setLoadingFlag(true);
    const fetch = async () => {
      const { data, error } = await config.supabase.from("songs").select();

      if (data) {
        setData(data);
      }

      if (error) {
        showNotification({
          title: "Error",
          message: error.message + "try again later",
          color: "red",
        });
      }
    };

    fetch();
    setLoadingFlag(false);
  }, []);

  const hello = () => {
    console.log("data", typeof data[0].created_at);
  };

  return (
    <div>
      <button onClick={hello}>button</button>
      <LoadingOverlay
        visible={loadingFlag}
        loaderProps={{ size: "lg", color: "cyan", variant: "dots" }}
        overlayOpacity={0.3}
      />

      <div>
        <Grid>
          {data.map((item, index) => {
            return (
              <Grid.Col span={6} key={index}>
                <div>
                  <Memory
                    song={item.song}
                    image={item.image}
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

export default Memories;
