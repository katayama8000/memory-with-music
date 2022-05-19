import React, { useEffect, useState } from "react";
import { config } from "../lib/supabase/supabase";
import { showNotification } from "@mantine/notifications";
import { Card, Image, Text } from "@mantine/core";

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
  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await config.supabase.from("songs").select();

      if (data) {
        setData(data);
      }

      if (error) {
        showNotification({
          title: "Error",
          message: error.message,
          color: "red",
        });
      }
    };

    fetch();
  }, []);

  const hello = () => {
    console.log("data", typeof data[0].created_at);
  };

  return (
    <div>
      <button onClick={hello}>button</button>
      <div>
        {data.map((item, index) => {
          return (
            <div key={index} className="py-5">
              <Card shadow="sm">
                <div className="flex">
                  <Image
                    src="img/brain.png"
                    width={40}
                    alt="No way!"
                    radius="md"
                    withPlaceholder
                    className="p-2"
                  />
                  song:{item.song}
                  <br />
                  artist:{item.artist}
                  <br />
                  memory:{item.memory}
                  <br />
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Memories;
