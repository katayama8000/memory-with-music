import React, { useEffect, useState } from "react";
import { config } from "../lib/supabase/supabase";
import { Memory } from "@components/layout/card/Memory";
import { showNotification } from "@mantine/notifications";
import { Grid, LoadingOverlay } from "@mantine/core";
import { data } from "@type/typeSupabase";

export const List = () => {
  const [data, setData] = useState<data[]>([]);
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

  return (
    <div>
      <LoadingOverlay
        visible={loadingFlag}
        loaderProps={{ size: "lg", color: "cyan", variant: "dots" }}
        overlayOpacity={0.3}
      />
      <div>
        <Grid>
          {data.map((item, index) => {
            return (
              <Grid.Col xs={6} key={index}>
                <div className="m-auto px-2">
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

export default List;
