import React from "react";
import { Loader } from "@mantine/core";
import { Lang } from "./headerComp/Lang";
import { ColorTheme } from "./headerComp/ColorTheme";
import { Router } from "./headerComp/Router";

type Props = {
  onClick: () => void;
  color: "dark" | "light";
};

export const HeaderTitle: React.FC<Props> = ({ onClick, color }) => {
  return (
    <div>
      <div className="mt-2 flex justify-center xs:justify-end">
        <Router />
      </div>
      <div className="pt-15 md:pt-18 flex justify-center">
        <h1 className="pr-2 pb-2 text-center italic hover:not-italic">
          memory with music
        </h1>
        <Loader color="cyan" size="sm" variant="bars" />
      </div>
      <div className="flex justify-center">
        <ColorTheme onClick={() => onClick()} color={color} />
      </div>
      <div className="m-2 flex justify-end">
        <Lang />
      </div>
    </div>
  );
};
