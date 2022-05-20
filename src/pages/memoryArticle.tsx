import { TypographyStylesProvider } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { config } from "src/lib/supabase/supabase";

const MemoryArticle = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await config.supabase
        .from("songs")
        .select("memory");

      if (data) {
        setData(data);
      }
    };

    fetch();
  }, []);
  return (
    <div>
      <div>memoryArticle</div>
      {data.map((item, index) => {
        return (
          <div key={index} className="whitespace-pre-wrap">
            <TypographyStylesProvider>
              <div dangerouslySetInnerHTML={{ __html: item.memory }} />
            </TypographyStylesProvider>
          </div>
        );
      })}
    </div>
  );
};

export default MemoryArticle;
