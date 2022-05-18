import React from "react";
import { config } from "../lib/supabase/supabase";

const fetch = async () => {
  const data = await config.supabase.from("song").select();

  console.log(data);
};

const supa = () => {
  return (
    <>
      <div onClick={fetch}>supa</div>
    </>
  );
};

export default supa;
