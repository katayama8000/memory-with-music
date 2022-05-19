import React, { useEffect, useState } from "react";
import { config } from "../lib/supabase/supabase";

const fetch = async () => {
  const { data } = await config.supabase.from("songs").select();

  console.log(data);
};

export const Memories = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await config.supabase.from("songs").select();
      setData(data);
    };

    fetch();
  }, []);
  return (
    <div>
      <div>good Memories</div>
      <div>
        {data.map((item, index) => {
          return (
            <div key={index}>
              {item.song}
              {item.artist}
              {item.memory}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Memories;
