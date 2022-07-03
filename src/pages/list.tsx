import React, { useEffect, useState } from "react";
import { config } from "../lib/supabase/supabase";
import { MemoryCard } from "@components/layout/card/MemoryCard";
import { Grid, LoadingOverlay } from "@mantine/core";
import { dataFromSupabase } from "@type/typeSupabase";
import { toast } from "@function/toast";

export const List = () => {
  const [data, setData] = useState<dataFromSupabase[]>([]);
  const [loadingFlag, setLoadingFlag] = useState<boolean>(false);
  useEffect(() => {
    setLoadingFlag(true);
    const fetch = async () => {
      const { data, error } = await config.supabase.from("songs").select();
      if (data) {
        setData(data);
      }
      if (error) {
        toast("Error", error.message + "try again later", "red");
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
          {data.map((item) => {
            return (
              <Grid.Col xs={6} key={item.id}>
                <div className="m-auto px-2">
                  <MemoryCard
                    id={item.id}
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
