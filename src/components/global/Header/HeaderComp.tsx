import { ColorTheme } from "@components/global/Header/ColorTheme";
import { Lang } from "@components/global/Header/Lang";
import { Loader } from "@mantine/core";
import React from "react";

type Props = {
  color: "dark" | "light";
  toggleColorTheme: () => void;
};
export const HeaderComp: React.FC<Props> = ({ color, toggleColorTheme }) => {
  return (
    <div className="relative flex justify-center ">
      <div className="ml-[284px] pr-2 pb-2  text-4xl font-bold italic hover:not-italic">
        memory with music
      </div>
      <Loader color="cyan" size="sm" variant="bars" />
      <div className=" absolute right-0 flex">
        <div className="mt-[6px]">
          <ColorTheme color={color} onClick={toggleColorTheme} />
        </div>
        <div>
          <Lang />
        </div>
      </div>
    </div>
  );
};
