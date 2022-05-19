import React from "react";
import { Loader } from "@mantine/core";

export const Title = () => {
  return (
    <div>
      <div className="flex justify-center pt-20">
        <h1 className="pr-2 pb-2 text-center italic hover:not-italic">
          memory with music
        </h1>
        <Loader color="cyan" size="sm" variant="bars" />
      </div>
    </div>
  );
};
