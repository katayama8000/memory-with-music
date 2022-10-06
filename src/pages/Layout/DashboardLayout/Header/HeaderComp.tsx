import { ColorTheme } from "./ColorTheme";
import { Lang } from "./Lang";
import { Loader } from "@mantine/core";
import React, { memo } from "react";

export const HeaderComp: React.FC = memo(() => {
  return (
    <div className="relative flex justify-center ">
      <div className="ml-[284px] pr-2 pb-2  text-4xl font-bold italic hover:not-italic">
        memory with music
      </div>
      <Loader color="cyan" size="sm" variant="bars" />
      <div className=" absolute right-0 flex">
        <div className="mt-[6px]">
          <ColorTheme />
        </div>
        <div>
          <Lang />
        </div>
      </div>
    </div>
  );
});

HeaderComp.displayName = "HeaderComp";
